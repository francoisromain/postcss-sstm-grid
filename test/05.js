const tests = {
  input: `@gs {}

.container {
  gs: container;
}

.row {
  gs: row;
}

.bloc-one-third {
  gs: fraction 1/3;
}

.bloc-three-fourth {
  gs: fraction 3/4;
}
`,
  output: `.container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto
}
.row {
    clear: both;
    margin-right: -1.5rem;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    align-content: flex-start
}
.row::after {
    content: "";
    display: table;
    clear: both
}
.bloc-one-third, .bloc-three-fourth {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    flex: 0 1 100%
}
.bloc-one-third {
    flex: 0 1 5.333333333333333rem
}
.bloc-three-fourth {
    flex: 0 1 13.875rem
}
@media (min-width: 42.5rem) {
    .container {
        width: 42.5rem
    }
}
@media (min-width: 63rem) {
    .container {
        width: 63rem
    }
}
@media (min-width: 83.5rem) {
    .container {
        width: 83.5rem
    }
}
@media (min-width: 104rem) {
    .container {
        width: 104rem
    }
}
@media (min-width: 124.5rem) {
    .container {
        width: 124.5rem
    }
}
@media (min-width: 145rem) {
    .container {
        width: 145rem
    }
}
@media (min-width: 165.5rem) {
    .container {
        width: 165.5rem
    }
}
` };

export default tests;
