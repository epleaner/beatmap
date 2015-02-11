(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/albumView'
		],
		function( Albumview ) {

			describe('Albumview Itemview', function () {

				it('should be an instance of Albumview Itemview', function () {
					var albumView = new Albumview();
					expect( albumView ).to.be.an.instanceof( Albumview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );