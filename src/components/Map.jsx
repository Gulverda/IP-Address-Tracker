
  function initMap() {
    // Create a map object centered on a specific location
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: YOUR_INITIAL_LATITUDE, lng: YOUR_INITIAL_LONGITUDE },
      zoom: YOUR_INITIAL_ZOOM_LEVEL,
    });

    // Create a search box and link it to the UI element
    var input = document.getElementById('search-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the search box results towards the map's current center
    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds());
    });

    // Listen for the event when the user selects a place from the search box
    searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // For each place, get the icon, name, and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry || !place.geometry.location) {
          console.log('Returned place contains no geometry');
          return;
        }

        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
        });

        bounds.extend(place.geometry.location);
      });

      map.fitBounds(bounds);
    });
  }


  window.onload = function () {
    initMap();
  };
