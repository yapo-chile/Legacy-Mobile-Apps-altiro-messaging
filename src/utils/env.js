export default {
  dataEnv(dataOp, elementId = '#env-data') {
    const element = document.querySelector(elementId); // #env-data
    const options = {
      baseUrlImg: element !== null ? element.getAttribute('data-base-img-url') : 'http://localhost:3000/favorites',
      baseUrlMain: element !== null ? element.getAttribute('data-base-url') : 'http://localhost:3000/favorites',
      baseUrl: element !== null ? element.getAttribute('data-base-url-get') : 'http://localhost:3000/favorites',
      accSession: element !== null ? element.getAttribute('data-acc-session') : '',
      hub: element !== null ? element.getAttribute('data-hub') : 'https://localhost:8080/static/hub.html',
      searchUrl: element !== null ? element.getAttribute('data-base-url-fav-search') : '',
      categories: element !== null ? element.getAttribute('data-base-categories') : 'eyIxMDAwIjp7ImxldmVsIjowLCJuYW1lIjoiSW5tdWVibGVzIn19',
      regions: element !== null ? element.getAttribute('data-base-regions') : 'eyIxIjp7Im5hbWUiOiJBcmljYSIsImNvbW11bmUiOnsiMSI6eyJuYW1lIjoiQWx0byBIb3NwaWNpbyJ9fX19',
      listingUrl: element !== null ? element.getAttribute('data-base-url-listing') : 'https://www.yapo.cl/chile/todos_los_avisos',
      currentRegion: element !== null ? element.getAttribute('data-base-current-region') : '',
      currentCategory: element !== null ? element.getAttribute('data-current-category') : '',
      currentSubCategory: element !== null ? element.getAttribute('data-current-subcategory') : '',
    };

    return options[dataOp];
  },
};
