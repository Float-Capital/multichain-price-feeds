import {
  ArbFeedsContract_AnswerUpdated_loader,
  ArbFeedsContract_AnswerUpdated_handler,
  BscFeedsContract_AnswerUpdated_loader,
  BscFeedsContract_AnswerUpdated_handler,
} from "../generated/src/Handlers.gen";

import { priceEntity, feedEntity } from "../generated/src/Types.gen";

ArbFeedsContract_AnswerUpdated_loader(({ event, context }) => {
  // try load the feed from the event into memory
  context.feed.load(event.srcAddress.toString());
});

ArbFeedsContract_AnswerUpdated_handler(({ event, context }) => {
  let feed = context.feed.get(event.srcAddress.toString());

  // if the feed doesn't exist, create it
  if (!feed) {
    let newFeed: feedEntity = {
      id: event.srcAddress.toString(),
    };
    context.feed.set(newFeed);
  }

  let price: priceEntity = {
    id: event.transactionHash,
    contractAddress: event.srcAddress.toString(),
    price: event.params.current,
    roundId: event.params.roundId,
    updatedAt: event.params.updatedAt,
    blockTimestamp: event.blockTimestamp, // take note of the block timestamp and contrast this to the updatedAt field in order to check the average latency between the answer being posted and it actually getting on chain.
  };

  context.price.set(price);
});

BscFeedsContract_AnswerUpdated_loader(({ event, context }) => {
  // try load the feed from the event into memory
  context.feed.load(event.srcAddress.toString());
});

BscFeedsContract_AnswerUpdated_handler(({ event, context }) => {
  let feed = context.feed.get(event.srcAddress.toString());

  // if the feed doesn't exist, create it
  if (!feed) {
    let newFeed: feedEntity = {
      id: event.srcAddress.toString(),
    };
    context.feed.set(newFeed);
  }

  let price: priceEntity = {
    id: event.transactionHash,
    contractAddress: event.srcAddress.toString(),
    price: event.params.current,
    roundId: event.params.roundId,
    updatedAt: event.params.updatedAt,
    blockTimestamp: event.blockTimestamp, // take note of the block timestamp and contrast this to the updatedAt field in order to check the average latency between the answer being posted and it actually getting on chain.
  };

  context.price.set(price);
});
