// Importing global URL
$(document).ready(function () {
    getPrincipalCourses();

    // // Get main courses for Home
    function getPrincipalCourses() {
        $.getScript('js/global.js', function () {
            $.ajax({
                type: "POST",
                url: _global.server_url+'web/web.php',
                data: "web_action=getHomeCourses",
                dataType: "json",
                success: function (response) {
                    setHomeCourses(response, _global.server_url);
                }, error: function (error) {
                    console.error(error);
                }
            });
        });
    }

    // Set courses in page
    function setHomeCourses(courses, server_url) {
        var label_courses = ``;
        courses.forEach(course => {
            label_courses += `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="blog-block">
                        <a href="${course.link}">
                            <img src="${ server_url+'assets/img/courses/'+course.image}" alt="${course.title_course}" class="img-fluid d-block mx-auto">
                        </a>
                        <div class="blog-text">
                            <a href="${course.link}" class="h5 my-2 d-inline-block">${course.title_course}</a>
                            <p>${course.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        $('#home-courses').html(label_courses);
    }
});