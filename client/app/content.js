document.addEventListener('DOMContentLoaded', function(event) {
  function controlClassForBar(state) {
    
    function getClasses(element) {
      var elementClasses = document.getElementById(element).className;

      if( elementClasses.length === 0 ) {
        return false;
      }

      return elementClasses.split(' ');    
    }

    function checkHeaderClass( headerModifier, headerClass) {
      var classes = getClasses(headerClass);

      if ( classes !== false ) {
        return classes.find(function(item) {
          return item === headerModifier;
        });
      } else {
        return false
      }
    }

    var headerModifier = 'header--blue',
      headerClass = 'header';

    if ( document.body.scrollTop > 90 ) {     

      if( !checkHeaderClass(headerModifier, headerClass) ) {
        document.getElementById(headerClass).className += ' ' + headerModifier;
      }

    } else {
      
      if( document.body.scrollTop === 0 ) {
        
        if( checkHeaderClass(headerModifier, headerClass) ) {
          var classes = getClasses(headerClass);
          document.getElementById(headerClass).className = classes.filter(function(item) {
            return item !== headerModifier;
          }).join(' ');
        }
      }
    }
  }

  window.addEventListener('scroll', controlClassForBar);

});
