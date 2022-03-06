module.exports = function(eleventyConfig) {
    eleventyConfig.setBrowserSyncConfig({
      files: './scss/style.scss'
    });
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("images");
    

  };