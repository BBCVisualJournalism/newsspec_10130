module.exports = function (grunt) {

    // *************************************************************************
    // PROJECT FILES
    // Make a list of templates you want converted to files
    // *************************************************************************

    var projectFiles = {
        'index.html': 'index.html.tmpl',
        'index.inc':  'index.inc.tmpl',
        'test.html':  'test.html.tmpl',
        'chap1_nav.html': 'chap1_nav.html.tmpl',
        'chap1_nav.inc':  'chap1_nav.inc.tmpl',
        'test_chap1_nav.html':  'test_chap1_nav.html.tmpl',
        'chap2_nav.html': 'chap2_nav.html.tmpl',
        'chap2_nav.inc':  'chap2_nav.inc.tmpl',
        'test_chap2_nav.html':  'test_chap2_nav.html.tmpl',
        'chap3_nav.html': 'chap3_nav.html.tmpl',
        'chap3_nav.inc':  'chap3_nav.inc.tmpl',
        'test_chap3_nav.html':  'test_chap3_nav.html.tmpl',
        'chap2_family_tree.html': 'chap2_family_tree.html.tmpl',
        'chap2_family_tree.inc':  'chap2_family_tree.inc.tmpl',
        'test_chap2_family_tree.html':  'test_chap2_family_tree.html.tmpl',
        'chap2_map.html': 'chap2_map.html.tmpl',
        'chap2_map.inc':  'chap2_map.inc.tmpl',
        'test_chap2_map.html':  'test_chap2_map.html.tmpl',
        'chap3_home_sharing.html': 'chap3_home_sharing.html.tmpl',
        'chap3_home_sharing.inc':  'chap3_home_sharing.inc.tmpl',
        'test_chap3_home_sharing.html':  'test_chap3_home_sharing.html.tmpl'
    };

    // *************************************************************************
    // GRUNT CONFIG
    // You shouldn't need to edit anything below here
    // *************************************************************************
    
    grunt.registerTask('perform_multi_lang_site_generator', function () {
        
        var config = grunt.config.get('config'),
            inlineStyleElm = grunt.file.read("content/" + config.services.default + "/css/inline.css"),
            scaffoldLite = config.scaffoldLite == 'true',
            inlineLiteJs = '',
            multi_lang_site_generator_data;

        if (scaffoldLite) {
            inlineStyleElm += grunt.file.read("content/" + config.services.default + "/css/main.css");
            inlineLiteJs = grunt.file.read("content/" + config.services.default + "/js/lite.js");
        }

        inlineLiteJs   = '<script>' + inlineLiteJs + '</script>';
        inlineStyleElm = '<style>' + inlineStyleElm + '</style>';

        multi_lang_site_generator_data = {
            version:             '<%= pkg.version %>',
            inlineLiteJs:        inlineLiteJs,
            inlineStyleElm:      inlineStyleElm,
            inlineIframeManager: '<%= grunt.file.read("tmp/iframemanager__host.js") %>',
            path:                '<%= env[config.whichEnv].domain %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content',
            pathStatic:          '<%= env[config.whichEnv].domainStatic %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content',
            projectNumber:       '<%= config.project_number %>',
            debug:               '<%= config.debug %>',
            amdModulePaths:      '<%= JSON.stringify(amdModulePaths) %>',
            scaffoldLite:        scaffoldLite
        };

        grunt.config('multi_lang_site_generator', {
            default: {
                options: {
                    vocabs:             ['<%= config.services.default %>'],
                    vocab_directory:    'source/vocabs',
                    template_directory: 'source/tmpl/',
                    output_directory:   'content',
                    data:               multi_lang_site_generator_data
                },
                files: projectFiles
            },
            build_all_other_sites: {
                options: {
                    vocabs:             '<%= config.services.others %>',
                    vocab_directory:    'source/vocabs',
                    template_directory: 'source/tmpl/',
                    output_directory:   'content',
                    data:               multi_lang_site_generator_data
                },
                files: projectFiles
            }
        });

        grunt.task.run('multi_lang_site_generator:default');   
    });
};