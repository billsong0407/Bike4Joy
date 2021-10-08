# Bike4Joy
A web-based application that searches and reviews outdoor bicycle parkings in City of Toronto 

## Information
Course name: Web computing and Web Systems <br />Group name: Bike4Joy <br />Member 1: Bill Song <br /> Member 2: Franklin Tian <br />

### Live URL
http://18.118.57.245/Bike4Joy/

### Dataset
City of Toronto Outdoor Bike Parking Places: https://open.toronto.ca/dataset/bicycle-parking-high-capacity-outdoor/

### Notes
Search form: index.html <br />
Sample results page: results.html -> http://18.118.57.245/Bike4Joy/results.html <br />
Sample individual object page: single-result.html <br />
Object submission page: submission.html <br />
User registration page: registration.html <br />

### Add on task 2 
d. 
i. Each image have 2 versions. First one being a regular version that will be displayed when the window is greater than a certain width. The second version will be a zoomed in version of the same picture. This will appear when the width is smaller than the given width.

```
COMMON SELECTORS:

universal selector: The css rules applied for this selector will apply effects on all HTML element on that page.

element selector: The css rules applied for this selector will apply effects on HTML elements based on that specific element name. Ex. p{...}

class selector: <div class="center">...</div> The css rules applied for this selector will apply effects on HTML elements with that specific class attribute. Ex. .center{...}

id selector: <div id="unique">...</div> The css rules applied for this selector will use the id attribute of a HTML element to select a specific element. This is usually used to style unique elements since id of an element is unique within a page. Ex. #unique{...}
```

ii.
```
1. The picture tag could give developers much more flexibility in specifying image resources and building responsive websites.
2. The source tag can be used to specify various format sizes. Some browers might not support all image formats, it will find the first format that is compatible.
3. Could make your own controls in HTML.

```

iii.
```
By using img element, you have the option to use srcset and sizes attributes. These provide information to the browser so that it casn make a smart decision on which image is appropriate for the certain situation. This is not possible in the picture element and source elements. In most situations nowadays, img element is used instead of picture.
```
=======