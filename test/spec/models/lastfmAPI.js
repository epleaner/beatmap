(function() {
	'use strict';

	var root = this;

	root.define([
		'models/api/lastfmAPI'
		],
		function( Lastfmapi ) {

			describe('Lastfmapi Model', function () {

				it('should be an instance of Lastfmapi Model', function () {
					var lastfmAPI = new Lastfmapi();
					expect( lastfmAPI ).to.be.an.instanceof( Lastfmapi );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );