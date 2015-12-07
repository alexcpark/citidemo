<?php include '../../../includes/header-meta.php'; ?>

	<body id="bv-page-guide" class="page5">
		
		<?php include '../../../includes/header-branding.php'; ?>
		<?php include '../../../includes/header-nav-program.php'; ?>
		<?php include '../../../includes/header-program-guide.php'; ?> 
	
					<!-- START CONTENT -->
				    <div class="content">
						<div class="main-section" style="display: block;">
					        <div class="container">
					          <div class="main-section-title">Key Activities </div>
					          <div class="row">
					            <div class="span8">
								  <div class="main-section-block-body main-section-block-break">
									  <p class="main-section-block-title">What are &quot;Activities&quot;</p>
									  <p class="main-section-block-break2">Activities are the actions that you perform everyday. They contribute towards your progress. Of your total activities, a subset is chosen to incentivize and award points. This incentivized set is listed below. They contribute to the various goals, learning targets, or comparisons in this design.</p>
								  	  <p class="main-section-block-title">Where do I find them? How do I perform them?</p>
									  <p class="main-section-block-break2">Target activities are identified for each of the programs and platforms in this demo. Please see a list of those programs below and the respective activities for each.</p>
									  <div class="bv-behaviors"></div>

									  </div>
								  </div>
								</div>
					          </div><!-- /.row -->
					        </div><!-- /.container -->
					    </div><!-- /.main-section -->
					</div><!-- /.content -->
					<!-- END CONTENT -->

			  <script>
				  // create necessary variables
			  	  var activities = {}, //create var array to store final activities structure later
				  section_titles = ['Onboarding','Goals','Learning','Collaboration'], // store array of section titles
				  siteIds_list = ['56420d8c280aab4561001e17','56439a91392bd9b347001628','56420de8d1b4cfb899001bde','564245bdd1b4cfbf41001e3a'], // grab current list of available sites
				  total_sites = siteIds_list.length;
				  
				  // Need a loop that start here FOR EACH SITE. Pass the section title and site ID.
				  for (i = 0; i < total_sites ; i++) {
					  
					  // build main html container elements
					  var section = '<div class="bv-behavior-group bv-behavior-group' + i + ' main-section-block-break"></div>',
					  section_header = '<p>' + section_titles[i] + '</p>',
					  section_table = '<table id="bv-table-' + section_titles[i].toLowerCase() + '" class="callout-table bv-behavior-list"></table>',
					  section_table_header = '<tr class="bv-list-header"><th class="column1">Activity</th><th class="column2">How to Perform</th><th class="column3">Value</th></tr>';
					  
					  // appends elements in proper order
					  $('.bv-behaviors').append($(section).append(section_header, $(section_table).append($(section_table_header))));
					  
					  // perform call to retrieve collection info, i.e. the total number of activities and pages for it.
					  BVSDK( 'sites/behaviors', { sites: siteIds_list[i] }, {
						  with_count: true,
						  limit: 30
					  }).ok( function(info_results) {

						  // establish variables for use inside this inner callback function
						  var current_site_id = this.ids.sites, // create variable and store the site ID
						  results = info_results, // storing all returned behavior objects
						  info = {}; // create place to store info
						  info.total = results._context_info.count, // storing the total number objects available
						  info.limit = results._context_info.limit, // size of the current batch
				  		  info.pages = Math.ceil( info.total / info.limit ); // determine number of pages for this set
						  
						  // iterate through the pages of behaviors for this site
						  for (p = 0; p < info.pages; p++) {
							  
							  // rebuild needed offset value from limit * current page number
							  var offset = p * info.limit;
							  
							  //  perform second call to iterate through pages, retrieve activities, and inject them into section_body
							  BVSDK( 'sites/behaviors', { sites: current_site_id }, { // immediately define and use variable
								  fields: ['hint'],
								  with_count: true,
								  offset: offset,
								  limit: info.limit
							  }).ok( function(collection_results) {
								  
								  // process results
								  var current_site_id = this.ids.sites, // grab current site
								  behaviors = collection_results.behaviors.reverse(), // store behaviors in current collection
								  sites_array = { // create sites array for looking up name of current site
									  '56420d8c280aab4561001e17':'onboarding',
									  '56439a91392bd9b347001628':'goals',
									  '56420de8d1b4cfb899001bde':'learning',
									  '564245bdd1b4cfbf41001e3a':'collaboration',
								  };
								  
								  // If site ID exists in array, grab it's value and use it to construct the append injection
								  if ( current_site_id in sites_array ) {
									  
									  // create needed objects
									  var site_name = sites_array[current_site_id],
									  // construct target id reference
									  local_target = '#bv-table-' + site_name;
									  
									  // process results for each behavior in the collection
									  for (b = 0; b < behaviors.length; b++) {
										  
										  // construct row for current behavior
										  var behavior_row = '<tr class="bv-behavior bv-behavior' + b + '"></tr>', // build core row
										  // build name, hint, and value
										  behavior_content = '<td class="bv-behavior-name column1">' + behaviors[b].name + '</td><td class="bv-behavior-hint column2">' + behaviors[b].hint + '</td><td class="bv-behavior-value column3"><span class="behavior-value">' + behaviors[b].units.points.possible + '</span><span class="behavior-label">pts</span></td>';
									  	  //append elements to local target
										  $(local_target).append($(behavior_row).append(behavior_content));
									  }
								  }
							  });
						  }
					  });
				  }
			  </script>
		
<?php include '../../../includes/footer.php'; ?>