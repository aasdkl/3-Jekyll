require "time"

SOURCE = "."
CONFIG = {
    'version'  => "0.1.0",
    'layouts'  => File.join(SOURCE,"_layouts"),
    'posts'    => File.join(SOURCE,"_posts"),
    'post_ext' => "markdown"
}

def ask(msg, valid_options)
    if valid_options
        answer = get_stdin("#{msg} #{valid_options.to_s.gsub(/"/,"").gsub(/,/,'/')}") while !valid_options.include?(answer)
    else
        answer = get_stdin(msg)
    end
    answer
end

def get_stdin(msg)
    print msg
    STDIN.gets.chomp
end

# post, rake post title="xxx" [cat="xxx xxx"]
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
    abort("rake aborted:'#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
    title    = ENV["title"] || "new-post"
    cat      = ENV["cat"]   || ENV["catego"]  || ENV["category"] || ENV["categories"] || ""
    slug     = title.downcase.strip.gsub(' ','-').gsub(/[^\w-]/,'')
    begin
        date = (ENV['date'] ? Time.parse(ENV['date']): Time.now).strftime('%Y-%m-%d')
    rescue => e
        puts "Error- date format must be YYYY-MM-DD"
        exit -1
    end

    filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
    if File.exist?(filename)
        abort("rake aborted!") if ask("#{filename} already exist, overwrite?", ['y','n']) == 'n'
    end

    puts "Creating new post: #{filename}"
    open(filename,'w') do |post|
        post.puts "---"
        post.puts "layout      : post"        
        post.puts "title       : "
        post.puts "date        : #{date}"
        post.puts "categories  : #{cat}" #in url
        post.puts "tags        : " 
        post.puts "---"
        post.puts "begin"
    end
end

