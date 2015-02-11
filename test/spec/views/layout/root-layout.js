(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/root-layout'
		],
		function( RootLayout ) {

			describe('RootLayout Layout', function () {

				it('should be an instance of RootLayout Layout', function () {
					var root-layout = new RootLayout();
					expect( root-layout ).to.be.an.instanceof( RootLayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );