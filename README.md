# Bluesky Labeler Starter Kit

Use this repository to get started with your own Bluesky Labeler. Click the "Use this template" button above to create a new repository, and then follow the instructions below.

As an example, this repository includes a labeler for setting your favorite of the five elements (Earth, Fire, Air, Water, Love) to your profile. You can edit the labels, descriptions, and other parameters in the `src/constants.ts` file.

## Prerequisites

- [Node.js](https://nodejs.org/) 21 or later
- [Bun](https://bun.sh/)

## Setup

Clone the repo and run `bun i` to install the dependencies. This project uses [Bun](https://bun.sh/) for package management.

Run `bunx @skyware/labeler setup` to convert an existing account into a labeler. You can exit after converting the account; there's no need to add the labels with the wizard. We'll do that from code.

Copy the `.env.example` file to `.env` and fill in the values:

```Dotenv
DID=did:plc:xxx
SIGNING_KEY=xxx
BSKY_IDENTIFIER=xxx
BSKY_PASSWORD=xxx
PORT=4100
METRICS_PORT=4101
FIREHOSE_URL=wss://jetstream.atproto.tools/subscribe
CURSOR_UPDATE_INTERVAL=10000
```

A `cursor.txt` file containing the time in microseconds also needs to be present. If it doesn't exist, it will be created with the current time.

Fill out the label IDs, names, descriptions etc. in `src/constants.ts` to your heart's desire. Run `bun set-posts` to create/update all posts at once, then copy/paste the related post rkeys ([record keys](https://atproto.com/specs/record-key)) into `src/constants.ts`. Run `bun set-labels` to create/update all labels at once.

Alternatively, create the posts by hand, edit `src/constants.ts` and use `bunx @skyware/labeler label add` to add the labels.

The server connects to [Jetstream](https://github.com/bluesky-social/jetstream), which provides a WebSocket endpoint that emits ATProto events in JSON. There are [many public instances](https://github.com/bluesky-social/jetstream/blob/main/README.md#public-instances) available:

| Hostname                          | Region  |
| --------------------------------- | ------- |
| `jetstream1.us-east.bsky.network` | US-East |
| `jetstream2.us-east.bsky.network` | US-East |
| `jetstream1.us-west.bsky.network` | US-West |
| `jetstream2.us-west.bsky.network` | US-West |

The server needs to be reachable outside your local network using the URL you provided during the account setup (typically using a reverse proxy such as [Caddy](https://caddyserver.com/)):

```Caddyfile
labeler.example.com {
	reverse_proxy 127.0.0.1:4100
}
```

Metrics are exposed on the defined `METRICS_PORT` for [Prometheus](https://prometheus.io/). [This dashboard](https://grafana.com/grafana/dashboards/11159-nodejs-application-dashboard/) can be used to visualize the metrics in [Grafana](https://grafana.com/grafana/).

Start the project with `bun run start`.

You can check that the labeler is reachable by checking the `/xrpc/com.atproto.label.queryLabels` endpoint of your labeler's server. A new, empty labeler returns `{"cursor":"0","labels":[]}`.

## Credits

- [alice](https://bsky.app/profile/did:plc:by3jhwdqgbtrcc7q4tkkv3cf), creator of the [Zodiac Sign Labels](https://github.com/aliceisjustplaying/zodiacsigns)
- [Juliet](https://bsky.app/profile/did:plc:b3pn34agqqchkaf75v7h43dk), author of the [Pronouns labeler](https://github.com/notjuliet/pronouns-bsky), whose code my labelers were originally based on
- [futur](https://bsky.app/profile/did:plc:uu5axsmbm2or2dngy4gwchec), creator of the [skyware libraries](https://skyware.js.org/) which make it easier to build things for Bluesky
