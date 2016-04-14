const tests = {
  input: `.row {
  clear: both;
  margin-right: -1.5rem
}

.row::after {
  content: "";
  display: table;
  clear: both
}

.bloc {
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  float: left;
  width: 16.5rem;
}

@structure {
  unit: 20.5rem;
  gutter: 1.5rem;
  padding: 1.5rem;
  max: 8;
  min: 2;
  display: float;
  align: center;
}

.container {
  structure: container;
}

.row {
  structure: row;
}

.show-2 {
  structure: show 2;
}

.show-7 {
  structure: show 7;
}
`,
  output: `.row {
  clear: both;
  margin-right: -1.5rem
}

.row::after {
  content: "";
  display: table;
  clear: both
}

.bloc {
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  float: left;
  width: 16.5rem;
}

.container {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto
}

.row {
  clear: both;
  margin-right: -1.5rem
}

.row::after {
  content: "";
  display: table;
  clear: both
}

@media (min-width: 43.5rem) {

  .container {
    width: 42.5rem
  }

  .show-2 {
    display: block;
    visibility: visible
  }
}

@media (min-width: 64rem) {

  .container {
    width: 63rem
  }
}

@media (min-width: 84.5rem) {

  .container {
    width: 83.5rem
  }
}

@media (min-width: 105rem) {

  .container {
    width: 104rem
  }
}

@media (min-width: 125.5rem) {

  .container {
    width: 124.5rem
  }
}

@media (min-width: 146rem) {

  .container {
    width: 145rem
  }

  .show-7 {
    display: block;
    visibility: visible
  }
}

@media (min-width: 166.5rem) {

  .container {
    width: 165.5rem
  }
}
`,
};

export default tests;
