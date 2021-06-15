const service = require("./reviews.service");
const treeize = require("../utils/treeize");


async function doesReviewExist(req, res, next){
  const review = await service.read(req.params.reviewId);

  if(review){
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found`
  });
}

async function update(req, res){
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id
  };

  await service.update(updatedReview);
  let result = await service.queryAfterUpdate(updatedReview.review_id);
  result = treeize(result);
  res.json({data: result});
}

async function destroy(req, res){
  await service.delete(
  res.locals.review.review_id
  );
  res.sendStatus(204);
};



module.exports ={
  update: [doesReviewExist, update],
  destroy: [doesReviewExist, destroy]
}