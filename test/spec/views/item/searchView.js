(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/searchView'
		],
		function( Searchview ) {

			describe('Searchview Itemview', function () {

				it('should be an instance of Searchview Itemview', function () {
					var searchView = new Searchview();
					expect( searchView ).to.be.an.instanceof( Searchview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );