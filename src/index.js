import { nodeRemove } from './utils';
import gridSystem from './grid-system';

const postcssGridSystem = (opts) => {
  const options = {
    width: 20.5,
    gutter: 1.5,
    padding: 1.5,
    max: 8,
    min: 2,
    align: 'center',
    display: 'flex',
  };

  Object.assign(options, opts);

  const e = {
    containers: [],
    rows: [],
    blocs: [],
    fractions: [],
    columns: [],
    rules: [],
  };

  const walkDecls = (node, breakpoint) => {
    node.walkDecls((decl) => {
      if (decl.prop.match(/^gs/)) {
        const value = decl.value.split(/\s+(?![^[]*\]|[^(]*\)|[^{]*})/);

        if (value[0] === 'container') {
          e.containers[breakpoint] = e.containers[breakpoint] || [];
          e.containers[breakpoint].push(decl.parent.selector);
        } else if (value[0] === 'row') {
          e.rows[breakpoint] = e.rows[breakpoint] || [];
          e.rows[breakpoint].push(decl.parent.selector);
        } else if (value[0] === 'bloc') {
          e.blocs[breakpoint] = e.blocs[breakpoint] || [];
          e.blocs[breakpoint][value[1]] = e.blocs[breakpoint][value[1]] || [];
          if (value[2] === 'right') {
            e.blocs[breakpoint][value[1]][0] =
              e.blocs[breakpoint][value[1]][0] || [];
            e.blocs[breakpoint][value[1]][0].push(decl.parent.selector);
          } else {
            e.blocs[breakpoint][value[1]][1] =
              e.blocs[breakpoint][value[1]][1] || [];
            e.blocs[breakpoint][value[1]][1].push(decl.parent.selector);
          }
        } else if (value[0] === 'fraction') {
          const i = value[1].split('/');

          e.fractions[breakpoint] = e.fractions[breakpoint] || [];
          e.fractions[breakpoint][i[1]] = e.fractions[breakpoint][i[1]] || [];
          e.fractions[breakpoint][i[1]][i[0]] =
            e.fractions[breakpoint][i[1]][i[0]] || [];
          e.fractions[breakpoint][i[1]][i[0]].push(decl.parent.selector);
        } else if (value[0] === 'columns') {
          const i = value[1].split('-');

          i[1] = i[1] || '0';
          e.columns[breakpoint] = e.columns[breakpoint] || [];
          e.columns[breakpoint][i[0]] = e.columns[breakpoint][i[0]] || [];
          e.columns[breakpoint][i[0]][i[1]] =
            e.columns[breakpoint][i[0]][i[1]] || [];
          e.columns[breakpoint][i[0]][i[1]].push(decl.parent.selector);
        }

        nodeRemove(decl, true);
      }
    });
  };

  return {
    postcssPlugin: 'postcss-grid-system',

    Once(rootNode, { rule, root, atRule }) {
      rootNode.walkAtRules('gs', (atRuleNode) => {
        atRuleNode.walkDecls((decl) => {
          if (
            decl.prop.match(/^width/) ||
            decl.prop.match(/^gutter/) ||
            decl.prop.match(/^padding/) ||
            decl.prop.match(/^max/) ||
            decl.prop.match(/^min/)
          ) {
            options[decl.prop] = parseFloat(decl.value);
          } else if (decl.prop.match(/^align/) || decl.prop.match(/^display/)) {
            options[decl.prop] = decl.value;
          }
        });

        rootNode.walkAtRules('gs-media', (gridMediaAtRule) => {
          walkDecls(gridMediaAtRule, gridMediaAtRule.params);

          gridMediaAtRule.each((mediaAtRule) => {
            e.rules[gridMediaAtRule.params] =
              e.rules[gridMediaAtRule.params] || [];
            e.rules[gridMediaAtRule.params].push(mediaAtRule);

            nodeRemove(mediaAtRule, true);
          });

          nodeRemove(gridMediaAtRule);
        });

        walkDecls(rootNode, 0);

        // console.log(util.inspect(e.blocs, false, null))

        const newNode = gridSystem(e, options, { rule, root, atRule });
        atRuleNode.replaceWith(newNode);
      });
    },
  };
};

module.exports = postcssGridSystem;
