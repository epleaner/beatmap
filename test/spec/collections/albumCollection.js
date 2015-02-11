(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/albumCollection'
		],
		function( Albumcollection ) {

			describe('Albumcollection Collection', function () {

				it('should be an instance of Albumcollection Collection', function () {
					var albumCollection = new Albumcollection();
					expect( albumCollection ).to.be.an.instanceof( Albumcollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );