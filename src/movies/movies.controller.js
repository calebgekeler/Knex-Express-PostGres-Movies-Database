const service = require("./movies.service");
const treeize = require("../utils/treeize");


async function list(req, res, next){
  const query = req.query.is_showing;
  //console.log("QUERY", query)
  if(query){
    return next();
  }
  const result = await service.list();
  //console.log(result)
  res.json({data: result})
}
 
async function isShowing(req, res, next){
  const isShowing = req.query.is_showing;
  let result = await service.isShowing();
  /*
  DO NOT REMOVE. WORKING SOLUTION FOR SQLITE TESTS
  COMMENTED OUT BECAUSE THERE IS A BETTER SOLUTION FOR POSTGRES DEPLOYMENT
  SOLUTION FOR POSTGRES IS FOUND IN MOVIES.SERVICE isShowing FUNCTION
  for(let i=0; i<result.length-1; i++){
    if(result[i].movie_id===result[i+1].movie_id){
      //console.log(result[i].movie_id)
      result.splice(i, 2);
    }
  }
  */
  res.json({data: result});
}

async function read(req, res, next){
  res.json({data: res.locals.movie});
}

async function doesMovieExist(req, res, next){
  const movie = await service.read(req.params.movieId)

  if(movie){
    res.locals.movie = movie;
    return next();
  }
  next({status: 404, message: `Movie cannot be found`})
}

async function getTheaters(req, res, next){
  const movieId = req.params.movieId;
  //console.log("MOVIE ID FOR THEATERS", movieId)
  const theaters = await service.getTheaters(movieId);
  res.json({data: theaters});
}

async function getReviews(req, res, next){
  const movieId = req.params.movieId;
  let reviews = await service.getReviews(movieId);
  reviews = treeize(reviews)
  if (reviews instanceof Error) return next({ message: reviews.message });
  //console.log(reviews)
  res.json({data: reviews});
}


module.exports = {
  list,
  isShowing,
  read: [doesMovieExist, read],
  theaters: [doesMovieExist, getTheaters],
  reviews: [doesMovieExist, getReviews]
}