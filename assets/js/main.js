---
layout: null
---

$(function() {
  var toc     = $('.toc-link'),
      sidebar = $('#sidebar'),
      main    = $('#main'),
      menu    = $('#menu'),
      x1, y1;

  // run this function after pjax load.
  var afterPjax = function() {
    // open links in new tab.
    $('#main').find('a').filter(function() {
      return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

    // discus comment.
    {% if site.disqus_shortname %}
    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//{{ site.disqus_shortname }}' + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
    {% endif %}
    
    {% if site.duoshuo_shortname %}
    (function() {
    	var t  = document.createElement('script');
    	t.innerText="var duoshuoQuery = {short_name: '{{ site.duoshuo_shortname }}'}"
			var ds = document.createElement('script'); ds.type = 'text/javascript'; ds.async = true;
			ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
			ds.charset = 'UTF-8';
			(document.getElementsByTagName('head')[0]  || document.getElementsByTagName('body')[0]).appendChild(t).appendChild(ds);
    })();
    {% endif %}

    // your scripts
//  $(this).addClass('active').siblings().removeClass('active');

  };
  afterPjax();


  // NProgress
  NProgress.configure({ showSpinner: false });


  // Pjax
  $(document).pjax('#sidebar-avatar, .toc-link', '#main', {
    fragment: '#main',
    timeout: 3000
  });

  $(document).on({
    'pjax:click': function() {
      NProgress.start();
      main.removeClass('fadeIn');
    },
    'pjax:end': function() {
      afterPjax();
      NProgress.done();
      main.scrollTop(0).addClass('fadeIn');
      menu.add(sidebar).removeClass('open');
      {% if site.useGoogle and site.google_analytics %}
	      ga('set', 'location', window.location.href);
	      ga('send', 'pageview');
      {% endif %}
      
      //load duoshuo here
      {% if site.duoshuo_shortname %}
      (function() {
//				var duoshuoQuery = {short_name: '{{ site.duoshuo_shortname }}'};
        var dus=$(".ds-thread");
        if($(dus).length==1){
	        var el = document.createElement('div');
	        el.setAttribute('data-thread-key',$(dus).attr("data-thread-key"));//必选参数
	        el.setAttribute('data-url',$(dus).attr("data-url"));
	        el.setAttribute('data-title',$(dus).attr("data-title"));
	        DUOSHUO.EmbedThread(el);
	        $(dus).html(el);
    		}
      })();
      {% endif %}
    }
  });


  // Tags Filter
  $('#sidebar-tags').on('click', '.sidebar-tag', function() {
    var filter = $(this).data('filter');
    if (filter === 'all') {
      toc.fadeIn(350);
    } else {
      toc.hide();
      $('.toc-link[data-tags~=' + filter + ']').fadeIn(350);
    }
    $(this).addClass('active').siblings().removeClass('active');
  });


  // Menu
  menu.on('click', function() {
    $(this).add(sidebar).toggleClass('open');
  });

});
