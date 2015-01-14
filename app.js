angular.module('flapperNews', ['ui.router'])

.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});
	$stateProvider
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

	$urlRouterProvider.otherwise('home');
}])

.factory('posts',[function(){
	var o={
		posts:[]
	};
	return o;
}])

.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
	$scope.post = posts.posts[$stateParams.id];
	
	$scope.addComment = function(){
		if($scope.body === ''){return;}
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body='';
	};

	$scope.incrementUpvotes = function(comment){
		comment.upvotes+=1;
	}


}])

.controller('MainCtrl', [
'$scope',
'posts',
function($scope,posts){

  $scope.posts = posts.posts;
  
  $scope.incrementUpvotes = function(post){
  		post.upvotes+=1;
  };
  $scope.addPost = function(){
  	if(!$scope.title || $scope.title === '') {return ;}
  	$scope.posts.push({
  		title: $scope.title,
  		link: $scope.link,
  	 	upvotes: 0,
  	 	comments: []
  	 });

  	$scope.title='';
  	$scope.link='';
  };
  
}]);