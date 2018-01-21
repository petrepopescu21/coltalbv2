var Prismic = require('prismic-javascript')
var format = require('./format.js')
var moment = require('moment')
var marked = require('marked')
var stories = undefined;

const langs = ['ro', 'de', 'en']

export default async function () {
  var api = await Prismic.api("https://coltalb.prismic.io/api")
  var labels = processLabels(await api.query(Prismic.Predicates.at('document.type', 'labels')))
  var dogs = processDogs(await api.query(Prismic.Predicates.at('document.type', 'dogs')))
  var stories = processStories(await api.query(Prismic.Predicates.at('document.type', 'stories')))
  return {
    labels,
    dogs,
    stories
  }
}


function processLabels(data) {
  var returnable = {}
  returnable['ro'] = {}
  returnable['en'] = {}
  returnable['de'] = {}
  var temp = data.results[0].data.labels
  for (var key in temp) {
    if (!temp.hasOwnProperty(key)) continue;
    let obj = temp[key];
    returnable['ro'][key] = obj.value.split('|')[0]
    returnable['en'][key] = obj.value.split('|')[1]
    returnable['de'][key] = obj.value.split('|')[2]
  }
  return returnable;
}

function processStories(data) {
  var returnable = []
  data.results.forEach((item) => {
    var content = {}
    var title = {}
    langs.forEach((lang) => {
      content[lang] = format.formatArray(item.data.stories.content.value[0][lang].value)
      title[lang] = item.data.stories.title.value[0][lang].value
    })

    returnable.push({
      uid: item.uid,
      title: title,
      content: content
    })
  })
  return returnable
}

function processDogs(data, lang) {
  var returnable = []
  data.results.forEach((item) => {
    var output = {}
    if (item.uid) output.uid = item.uid

    if (item.data.dogs.name)
      output.name = item.data.dogs.name.value
    else
      output.name = ""

    if (item.data.dogs.birthdate) {
      output.birthdate = item.data.dogs.birthdate.value
      var a = moment()
      var b = moment(output.birthdate)

      var age = a.diff(b, 'months')
      if (age < 12)
        output.age = 1
      if (age >= 12 && age <= 30)
        output.age = 2
      if (age > 30)
        output.age = 3
    } else {
      output.birthdate = ""
      output.age = 0
    }
    if (item.data.dogs.status) {
      if (item.data.dogs.status.value == "adoptat")
        output.status = 1
      else if (item.data.dogs.status.value == "rezervat")
        output.status = 2
      else output.status = 0
    } else output.status = 0

    if (item.data.dogs.sex)
      output.sex = item.data.dogs.sex.value
    else
      output.sex = "N/A"

    if (item.data.dogs.sort)
      output.sort = item.data.dogs.sort.value
    else output.sort = 0

    if (item.data.dogs.size)
      output.size = item.data.dogs.size.value
    else
      output.size = "N/A"

    if (item.data.dogs.description) {
      output.description = item.data.dogs.description.value[0]


      for (var k in output.description)

        output.description[k] = nl2br(output.description[k].value)


    } else
      output.description = {
        en: "",
        de: "",
        ro: ""
      }
    if (item.data.dogs.restrictii) {
      output.restrictii = item.data.dogs.restrictii.value[0]
      for (var k in output.restrictii)

        output.restrictii[k] = output.restrictii[k].value

    } else
      output.restrictii = {
        en: "-",
        de: "-",
        ro: "-"
      }

    if (item.data.dogs.dataadapost) {
      output.dataadapost = item.data.dogs.dataadapost.value
    } else
      output.dataadapost = "N/A"

    if (item.data.dogs.castrat) {
      output.castrat = item.data.dogs.castrat.value
    } else
      output.castrat = "N/A"
    if (item.data.dogs['long-description']) {
      output.longdescription = item.data.dogs['long-description'].value[0]
      for (var k in output.longdescription)
        output.longdescription[k] = marked(output.longdescription[k].value, {
          sanitize: true
        })
    } else
      output.longdescription = {
        en: "",
        de: "",
        ro: ""
      }
    //console.log(item.data.dogs.gallery.value[0].image.value.main.dimensions.width)
    output.images = []
    output.frontimages = []
    output.largeimages = []
    if (item.data.dogs.gallery) {
      item.data.dogs.gallery.value.forEach((image) => {
        output.images.push({
          src: image.image.value.main.url,
          w: parseInt(image.image.value.main.dimensions.width),
          h: parseInt(image.image.value.main.dimensions.height)
        })
        //console.log(output.images)
        if (image.image.value.views['front'])
          output.frontimages.push({
            src: image.image.value.views['front'].url,
            w: parseInt(image.image.value.views['front'].dimensions.width),
            h: parseInt(image.image.value.views['front'].dimensions.height)
          })
        if (image.image.value.views['square'])
          output.largeimages.push({
            src: image.image.value.views['square'].url,
            w: parseInt(image.image.value.views['square'].dimensions.width),
            h: parseInt(image.image.value.views['square'].dimensions.height)
          })

      })
    } else
      output.images.push("images/nodog.jpg")



    /*
    output.images256=[]
    item.data['dogs.gallery'].value.forEach((image)=>{
        output.images256.push(image.image.value.views['256'].url)
    })
    output.images512=[]
    item.data['dogs.gallery'].value.forEach((image)=>{
        output.images512.push(image.image.value.views['512'].url)
    })*/
    returnable.push(output)
    //console.log(returnable.images)
  })
  returnable.sort((a, b) => {
    return b.sort > a.sort
  })

  return returnable
}

function nl2br(str) {
  var breakTag = '<br />';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}