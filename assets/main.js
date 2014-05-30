require('npm-typeahead')({
  npmUrl: 'https://www.nmpjs.org',// URL to re-direct the user to.
  searchUrl: 'http://typeahead-1.aws-west.internal.npmjs.com', // URL for search npm-typeahead REST server.
  $: $ // jQuery dependency.
});
