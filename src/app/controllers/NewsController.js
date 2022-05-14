var rp = require('request-promise');
const axios = require('axios').default;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class NewsController {
    // [GET] /news
    async index(req, res, next) {
        // const html = await fetch('https://covid19.gov.vn/chi-dao-chong-dich.htm')
        const html = await axios.get('https://covid19.gov.vn/chi-dao-chong-dich.htm')
            .then(response => response.data)
            .then(
                res => {

                    const dom = new JSDOM(res);

                    const newPosts = dom.window.document.querySelector(".box-stream");

                    return newPosts.innerHTML;
                }
            )

        res.render('news', { html });
    }
    async detail(req, res, next) {
        const link = 'https://covid19.gov.vn/' + req.params.detail;


        const html = await axios.get(link)
            .then(response => response.data)
            .then((response) => {

                const dom = new JSDOM(response);

                const a = dom.window.document.querySelector(".detail-main").innerHTML;

                return a;
            })

        res.render('news', { html });
    }
}

module.exports = new NewsController;
