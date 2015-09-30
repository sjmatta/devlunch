/* globals Meteor, HTTP */

import { Sites } from 'lib/Collections';

Meteor.startup(() => {
  const params = {
    location: '38.89, -77.08',
    radius: 500,
    types: 'food',
    key: 'AIzaSyA_VXMQnJnJiZu00BxAkBxoHY3oAByb5Ts',
  };
  const sites = HTTP.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', { params: params });
  sites.data.results.forEach(site => {
    site.deleted = false;
    Sites.upsert({name: site.name}, site);
  });
});
