//import * as Sentry from "@sentry/browser";

function init() {
  //   Sentry.init({
  //     dsn: "https://fae32c5749254fe18dc13fb2182faea7@sentry.io/1771232"
  //   });
}

function log(error) {
  console.error(error);
  //Sentry.captureException(error);
}

export default {
  init,
  log
};
