(function() {
	'use strict';

	var root = this;

	root.define([
		'models/artist'
		],
		function( Artist ) {

			describe('Artist Model', function () {

				it('should be an instance of Artist Model', function () {
					var artist = new Artist();
					expect( artist ).to.be.an.instanceof( Artist );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );