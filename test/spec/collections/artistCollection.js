(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/artistCollection'
		],
		function( Artistcollection ) {

			describe('Artistcollection Collection', function () {

				it('should be an instance of Artistcollection Collection', function () {
					var artistCollection = new Artistcollection();
					expect( artistCollection ).to.be.an.instanceof( Artistcollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );