import { ComAtprotoLabelDefs } from '@atcute/client/lexicons';
import { LabelerServer } from '@skyware/labeler';

import { DID, SIGNING_KEY } from './config.js';
import { DELETE, LABELS, LABEL_LIMIT } from './constants.js';
import logger from './logger.js';

export const labelerServer = new LabelerServer({ did: DID, signingKey: SIGNING_KEY });

export const label = (did: string, rkey: string) => {
  logger.info(`Received rkey: ${rkey} for ${did}`);

  if (rkey === 'self') {
    logger.info(`${did} liked the labeler. Returning.`);
    return;
  }
  try {
    const labels = fetchCurrentLabels(did);

    if (rkey.includes(DELETE)) {
      deleteAllLabels(did, labels);
    } else {
      addOrUpdateLabel(did, rkey, labels);
    }
  } catch (error) {
    logger.error(`Error in \`label\` function: ${error}`);
  }
};

function fetchCurrentLabels(did: string) {
  const query = labelerServer.db
    .prepare<string[]>(`SELECT * FROM labels WHERE uri = ?`)
    .all(did) as ComAtprotoLabelDefs.Label[];

  const labels = query.reduce((set, label) => {
    if (!label.neg) set.add(label.val);
    else set.delete(label.val);
    return set;
  }, new Set<string>());

  if (labels.size > 0) {
    logger.info(`Current labels: ${Array.from(labels).join(', ')}`);
  }

  return labels;
}

function deleteAllLabels(did: string, labels: Set<string>) {
  const labelsToDelete: string[] = Array.from(labels);

  if (labelsToDelete.length === 0) {
    logger.info(`No labels to delete`);
  } else {
    logger.info(`Labels to delete: ${labelsToDelete.join(', ')}`);
    try {
      labelerServer.createLabels({ uri: did }, { negate: labelsToDelete });
      logger.info('Successfully deleted all labels');
    } catch (error) {
      logger.error(`Error deleting all labels: ${error}`);
    }
  }
}

function addOrUpdateLabel(did: string, rkey: string, labels: Set<string>) {
  const newLabel = LABELS.find((label) => label.rkey === rkey);
  if (!newLabel) {
    logger.warn(`New label not found: ${rkey}. Likely liked a post that's not one for labels.`);
    return;
  }
  logger.info(`New label: ${newLabel.identifier}`);

  if (labels.size >= LABEL_LIMIT) {
    try {
      labelerServer.createLabels({ uri: did }, { negate: Array.from(labels) });
      logger.info(`Successfully negated existing labels: ${Array.from(labels).join(', ')}`);
    } catch (error) {
      logger.error(`Error negating existing labels: ${error}`);
    }
  }

  try {
    labelerServer.createLabel({ uri: did, val: newLabel.identifier });
    logger.info(`Successfully labeled ${did} with ${newLabel.identifier}`);
  } catch (error) {
    logger.error(`Error adding new label: ${error}`);
  }
}
