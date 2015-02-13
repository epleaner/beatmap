(function() {
	'use strict';

	var root = this;

	root.define([
		'views/collection/albumGridView'
		],
		function( Albumgridview ) {

			describe('Albumgridview Collectionview', function () {

				it('should be an instance of Albumgridview Collectionview', function () {
					var albumGridView = new Albumgridview();
					expect( albumGridView ).to.be.an.instanceof( Albumgridview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );