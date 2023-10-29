import cssmin

def minify_css():
    css_files = [
        'views/static/css/global.css',
        'views/static/css/custom.css',
        'views/static/css/progress-bar.css',
        'views/static/css/sidebar.css',
        'views/static/css/responsive.css'
    ]
    combined_css = ''

    for file in css_files:
        with open(file, 'r') as f:
            css_content = f.read()
            combined_css += css_content


    minified_css = cssmin(combined_css)
    
    output_file = 'views/static/css/styles.min.css'

    with open(output_file, 'w') as f:
        f.write(minified_css)
