Meteor.startup(() => {
  const params = {
    location: '38.89, -77.08',
    radius: 500,
    types: 'food',
    key: 'AIzaSyCZz597sT0-5032NmK8ScW00bVz4_8KPME',
  };
  const sites = HTTP.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', { params: params });
  sites.data.results.forEach(site => {
    Sites.upsert({name: site.name}, site);
  });
});
