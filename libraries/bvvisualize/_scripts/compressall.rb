# This is the build script to produce all the compressed and debug JavaScript files and CSS files,
# It requires Ruby, YUI Compressor, SASS and Compass to be installed 
# Ruby and YUI Compressor can be installed via HomeBrew, SASS and Compass can be installed via gem install
release_path = ".."
def run (cmd)
  out = `#{cmd}`
  puts out
end

css_themes = [
  "-light-ocean",
  "-light-teal",
  "-light-highkey",
  "-dark-blue",
  "-dark-ocean",
  "-dark-teal",
  "-dark-highkey",
  "-bleach-yellow",
  "-bleach-orange",
  "-bleach-red",
  "-bleach-purple",
  ""
]
viz_compass = "#{release_path}/_compass"
viz_sass = "#{viz_compass}/sass"
viz_sass_var = "_bvtheme.scss"
viz_src = "#{release_path}"
viz_des = "#{release_path}/compressed"
viz_demo = "#{release_path}/_demo/colorManager/compressed"
run "rm -rf #{viz_des};  mkdir #{viz_des};"
build_num = `git rev-parse --short=12 HEAD | tr '\n' ' '`

js_libs = [
  "common/js/bvviz.js",
  "common/js/utilities.js",
  "leaderboard/leaderboard.js",
  "levelProgress/levelProgress.js",
  "missionProgress/missionProgress.js",
  "missionRewards/missionRewards.js",
  "missionTutorial/missionTutorial.js",
  "notify/notify.js",
  "playerCard/playerCard.js",
  "playerHeader/playerHeader.js",
  "playerHeader/playerCollection.js",
  "playerRow/playerRow.js",
  "playerMissions/playerMissions.js",
  "playerProfile/playerProfile.js",
  "playerRewards/playerRewards.js",
  "playerTracks/playerTracks.js",
  "playerStream/playerStream.js",
  "customContainer/customContainer.js",
  "rewardProgress/rewardProgress.js",
  "trackProgress/trackProgress.js",
  "trackMissions/trackMissions.js",
  "siteStream/siteStream.js",
  "followingStream/followingStream.js"
]

css_libs = [
  "common/css/bvviz.css",
  "common/css/leaderboard.css",
  "common/css/levelProgress.css",
  "common/css/missionProgress.css",
  "common/css/missionRewards.css",
  "common/css/missionTutorial.css",
  "common/css/notify.css",
  "common/css/playerCard.css",
  "common/css/playerHeader.css",
  "common/css/playerRow.css",
  "common/css/playerMissions.css",
  "common/css/playerProfile.css",
  "common/css/playerRewards.css",
  "common/css/playerTracks.css",
  "common/css/playerStream.css",
  "common/css/customContainer.css",
  "common/css/rewardProgress.css",
  "common/css/trackProgress.css",
  "common/css/trackMissions.css",
  "common/css/siteStream.css",
  "common/css/followingStream.css"
]


puts ">>>> START: Combining JS"

to_path = "#{viz_des}/bvVisualize_debug.js"
to_file = File.open(to_path, 'a')

to_file.write( "/*! Build #{build_num} */\n" )

to_file.close

viz_path = "#{viz_des}/bvVisualize_files_debug.js"
viz_file = File.open(viz_path, 'a')

has_header = false

js_libs.each do |lib|
  from_path = "#{viz_src}/#{lib}"
  puts "  Combine `#{from_path}` to `#{viz_path}`"
  filename = from_path.split('/').last
  source = File.read(from_path)

  if !has_header
    write = source
    has_header = true
  else
    regex = /\/\*\!(.*?)\*\/(.*)/m
    scan_matches = source.scan(regex)
    write = scan_matches[0][1]
  end

  viz_file.write(write)
end

viz_file.close

puts "START: Compress JS"
run "yuicompressor #{viz_des}/bvVisualize_files_debug.js > #{viz_des}/bvVisualize_files.js"

puts "COMPRESS BVVIZ JS COMPLETE", ""

puts "START: Including Local Library"
#Common files first first
run "cat #{release_path}/commonLibrary/js/md5.js >> #{viz_des}/bvVisualize_debug.js"
run "cat #{release_path}/commonLibrary/js/sha1.js >> #{viz_des}/bvVisualize_debug.js"
run "cat #{release_path}/commonLibrary/js/DateFormat.js >> #{viz_des}/bvVisualize_debug.js"
run "cat #{release_path}/commonLibrary/js/progress-polyfill.js >> #{viz_des}/bvVisualize_debug.js"

#Duplicate debug -> release
run "cp #{viz_des}/bvVisualize_debug.js #{viz_des}/bvVisualize.js"

#Combine debug
run "cat #{viz_des}/bvVisualize_files_debug.js >> #{viz_des}/bvVisualize_debug.js"

#Then combine release
run "cat #{viz_des}/bvVisualize_files.js >> #{viz_des}/bvVisualize.js"

puts "INCLUDING LOCAL LIBRARY COMPLETE"

#clean up temp files
run "rm -f #{viz_des}/bvVisualize_files.js"
run "rm -f #{viz_des}/bvVisualize_files_debug.js"

css_themes.each do |viz_css|
  puts ">>>> ADD COLOR THEME #{viz_css}"

  puts "START: COMPASS SCSS"
  puts "  Add configuration settings", ""

  File.open("#{viz_sass}/#{viz_sass_var}", "w+") do |f|
    case viz_css
      when ""
        f.write("$boolean_dark_theme:false; $boolean_highkey_header:false; $boolean_desaturated_ribbon:false; $boolean_bleach_theme:false; $primary_accent: #36a8de;")
      when "-light-ocean"
        f.write("$boolean_dark_theme:false; $boolean_highkey_header:false; $boolean_desaturated_ribbon:true; $boolean_bleach_theme:false;  $primary_accent: #3378df;")
      when "-light-teal"
        f.write("$boolean_dark_theme:false; $boolean_highkey_header:false; $boolean_desaturated_ribbon:true; $boolean_bleach_theme:false;  $primary_accent: #4e96ab;")
      when "-light-highkey"
        f.write("$boolean_dark_theme:false; $boolean_highkey_header:true;  $boolean_desaturated_ribbon:false; $boolean_bleach_theme:false; $primary_accent: #36a8de;")
      when "-dark-blue"
        f.write("$boolean_dark_theme:true;  $boolean_highkey_header:false; $boolean_desaturated_ribbon:false; $boolean_bleach_theme:false; $primary_accent: #36a8de;")
      when "-dark-ocean"
        f.write("$boolean_dark_theme:true;  $boolean_highkey_header:false; $boolean_desaturated_ribbon:true; $boolean_bleach_theme:false;  $primary_accent: #3378df;")
      when "-dark-teal"
        f.write("$boolean_dark_theme:true;  $boolean_highkey_header:false; $boolean_desaturated_ribbon:true; $boolean_bleach_theme:false;  $primary_accent: #4e96ab;")
      when "-dark-highkey"
        f.write("$boolean_dark_theme:true;  $boolean_highkey_header:true;  $boolean_desaturated_ribbon:false; $boolean_bleach_theme:false; $primary_accent: #36a8de;")
      when "-bleach-yellow"
        f.write("$boolean_dark_theme:false;  $boolean_highkey_header:true;  $boolean_desaturated_ribbon:true; $boolean_bleach_theme:true; $primary_accent: #dcb53f;")
      when "-bleach-orange"
        f.write("$boolean_dark_theme:false;  $boolean_highkey_header:true;  $boolean_desaturated_ribbon:true; $boolean_bleach_theme:true; $primary_accent: #e0843a;")
      when "-bleach-red"
        f.write("$boolean_dark_theme:false;  $boolean_highkey_header:true;  $boolean_desaturated_ribbon:true; $boolean_bleach_theme:true; $primary_accent: #c54a55;")
      when "-bleach-purple"
        f.write("$boolean_dark_theme:false;  $boolean_highkey_header:true;  $boolean_desaturated_ribbon:true; $boolean_bleach_theme:true; $primary_accent: #6d6cad;")
    end
  end

  puts "START: Compile COMPASS SCSS"

  Dir.chdir("#{viz_compass}") do
    run "compass compile -e production --force;"
  end

  #puts "START: Add color theme CSS"
  puts "START: Combining CSS"

  run "rm #{viz_des}/bvVisualize#{viz_css}.css; rm #{viz_des}/bvVisualize#{viz_css}_debug.css;"


  has_header = false

  to_path = "#{viz_des}/bvVisualize#{viz_css}_debug.css"
  to_file = File.open(to_path, 'a')

  to_file.write( "/*! Build #{build_num} */\n" )

  css_libs.each do |lib|
    from_path = "#{viz_src}/#{lib}"
    puts "  Combine `#{from_path}` to `#{to_path}`"
    filename = from_path.split('/').last
    source = File.read(from_path)

    if !has_header
      write = source
      has_header = true
    else
      regex = /\/\*\!(.*?)\*\/(.*)/m
      scan_matches = source.scan(regex)
      write = scan_matches[0][1]
    end
    
    to_file.write(write)
  end

  to_file.close

  puts "START: Compress CSS"
  puts "  Starting Compress CSS"
  run "yuicompressor #{viz_des}/bvVisualize#{viz_css}_debug.css > #{viz_des}/bvVisualize#{viz_css}.css"

  puts "COMPRESS COLOR THEME CSS #{viz_css} COMPLETE", ""
end

# Replace the demo compressed files
puts "UPDATE DEMO COMPRESSED FILES"
run "rm -rf #{viz_demo};  mkdir #{viz_demo}; cp #{viz_des}/* #{viz_demo};"

# Clean up configuration setting
puts "ClEAN UP COLOR THEME SETTINGS"
File.open("#{viz_sass}/#{viz_sass_var}", "w+") do |f|
  f.write("")
end

# Move debug files into subfolder
run "mkdir #{viz_des}/debug"
run "mv #{viz_des}/*_debug.* #{viz_des}/debug"
