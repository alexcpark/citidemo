# This is the general build script to produce the compressed and debug JavaScript files and CSS files (default)
# It requires Ruby and YUI Compressor to be installed 
# Ruby and YUI Compressor can be installed via HomeBrew
release_path = ".."
def run (cmd)
  out = `#{cmd}`
  puts out
end

puts "COMPRESS BVVIZ"
viz_src = "#{release_path}"
viz_des = "#{release_path}/compressed/sharepoint"
run "rm -rf #{viz_des}"
run "mkdir #{viz_des};"
build_num = `git rev-parse --short=12 HEAD | tr '\n' ' '` #Time.now.to_i

js_libs = [
  "common/js/bvviz.js",
  "common/js/utilities.js",
  "sharepoint/common/js/utilities.js",
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
  "trackTutorial/trackTutorial.js",
  "siteStream/siteStream.js",
  "followingStream/followingStream.js",
  "sharepoint/common/js/bvviz.js",
  "sharepoint/common/js/ready.js",
  "sharepoint/utility/utility.js"
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
  "common/css/trackTutorial.css",
  "common/css/siteStream.css",
  "common/css/followingStream.css"
]

puts "START: Combining JS"

to_path = "#{viz_des}/bvVisualize_core_debug.js"
to_file = File.open(to_path, 'a')

to_file.write( "/*! Build #{build_num} */\n" )

to_file.close

viz_path = "#{viz_des}/bvVisualize_core_files_debug.js"
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

puts "START: Combining CSS"

has_header = false

to_path = "#{viz_des}/bvVisualize_core_debug.css"
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

puts "START: Compress"
puts "  Starting Compress JS"
run "yuicompressor #{viz_des}/bvVisualize_core_files_debug.js > #{viz_des}/bvVisualize_core_files.js --nomunge"
puts "  Starting Compress CSS"
run "yuicompressor #{viz_des}/bvVisualize_core_debug.css > #{viz_des}/bvVisualize_core.css"

puts "COMPRESS BVVIZ COMPLETE"

puts "START: Including Local Library"
#Common files first first
#run "cat #{release_path}/commonLibrary/js/jquery-1.11.3.js >> #{viz_des}/bvVisualize_debug.js"
#run "cat #{release_path}/connectors/common/js/jQueryNoConflict.js >> #{viz_des}/bvVisualize_debug.js"
#run "cat #{release_path}/commonLibrary/js/jquery-ui.js >> #{viz_des}/bvVisualize_debug.js"
run "cat #{release_path}/commonLibrary/js/md5.js >> #{viz_des}/bvVisualize_core_debug.js"
run "cat #{release_path}/commonLibrary/js/sha1.js >> #{viz_des}/bvVisualize_core_debug.js"

#Duplicate debug -> release
run "cp #{viz_des}/bvVisualize_core_debug.js #{viz_des}/bvVisualize_core.js"

#Combine debug
run "cat #{viz_des}/bvVisualize_core_files_debug.js >> #{viz_des}/bvVisualize_core_debug.js"

#Then combine release
run "cat #{viz_des}/bvVisualize_core_files.js >> #{viz_des}/bvVisualize_core.js"

puts "INCLUDING LOCAL LIBRARY COMPLETE"

#clean up temp files
run "rm -f #{viz_des}/bvVisualize_core_files.js"
run "rm -f #{viz_des}/bvVisualize_core_files_debug.js"

# Move debug files into subfolder
run "mkdir #{viz_des}/debug"
run "mv #{viz_des}/*_debug.* #{viz_des}/debug"