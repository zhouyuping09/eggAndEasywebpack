import Vue from 'vue';

/**
 * 去掉HTML标签
 */
Vue.filter('removeHtml', input => {
  return input && input.replace(/<(?:.|\n)*?>/gm, '')
    .replace(/(&rdquo;)/g, '\"')
    .replace(/&ldquo;/g, '\"')
    .replace(/&mdash;/g, '-')
    .replace(/&nbsp;/g, '')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/<[\w\s"':=\/]*/, '');
});

Vue.filter('thousand', value => {
  if (!value) {
    return '';
  }
  if (typeof (value) !== 'string' && typeof (value) !== 'number') {
    return value;
  }
  // parse number to string
  value = value + '';
  return value.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g, ',$1');
});
