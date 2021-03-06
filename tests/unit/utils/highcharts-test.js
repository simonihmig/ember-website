import {
  createChartOptions,
  highchartsOptions,
} from 'ember-website/utils/highcharts';
import { module, test } from 'qunit';

const customData = [
  {
    color: '#1E719B',
    data: [
      [1, 39],
      [2, 19],
      [3, 34],
      [4, 36],
      [5, 36],
      [6, 67],
      [7, 148],
      [8, 278],
      [9, 186],
      [10, 384],
    ],
    name: '2019',
    showInLegend: false,
  },
];

const defaultData = [
  {
    color: '#aaaaaa',
    data: 0,
    id: 'placeholder',
  },
];

const defaultChartOptions = {
  chart: {
    backgroundColor: 'transparent',
    type: 'column',
  },

  title: {
    text: '',
  },

  yAxis: {
    labels: {
      format: '{value} %',
    },

    title: {
      text: null,
    },
  },
};

module('Unit | Utility | highcharts', function () {
  module('createChartOptions', function () {
    test('returns an object with series, when we call the function without any parameters', function (assert) {
      const chartOptions = createChartOptions();

      assert.deepEqual(
        chartOptions,
        {
          ...defaultChartOptions,
          series: defaultData,
        },
        'We get the correct chart options.'
      );
    });

    test('returns an object with series, when we call the function with parameters that are undefined', function (assert) {
      const chartOptions = createChartOptions({
        chartOptions: undefined,
        data: undefined,
      });

      assert.deepEqual(
        chartOptions,
        {
          ...defaultChartOptions,
          series: defaultData,
        },
        'We get the correct chart options.'
      );
    });

    test('We can pass data to override the default data', function (assert) {
      const chartOptions = createChartOptions({
        chartOptions: undefined,
        data: customData,
      });

      assert.deepEqual(
        chartOptions,
        {
          ...defaultChartOptions,
          series: customData,
        },
        'We get the correct chart options.'
      );
    });

    test('We can pass chartOptions to override the default chart options', function (assert) {
      const chartOptions = createChartOptions({
        chartOptions: {
          chart: {
            type: 'spline',
          },

          subtitle: {
            text: '',
          },

          title: {
            text: 'How Likely Are You To Recommend Ember?',
          },

          xAxis: {
            type: 'category',
          },

          yAxis: {
            title: {
              text: 'Responses',
            },
          },
        },

        data: customData,
      });

      assert.deepEqual(
        chartOptions,
        {
          chart: {
            backgroundColor: 'transparent',
            type: 'spline',
          },

          series: customData,

          subtitle: {
            text: '',
          },

          title: {
            text: 'How Likely Are You To Recommend Ember?',
          },

          xAxis: {
            type: 'category',
          },

          yAxis: {
            labels: {
              format: '{value} %',
            },

            title: {
              text: 'Responses',
            },
          },
        },
        'We get the correct chart options.'
      );
    });
  });

  module('highchartsOptions', function () {
    test('returns an object with valid Highcharts configuration options', function (assert) {
      const { credits, plotOptions, time } = highchartsOptions;

      assert.strictEqual(
        credits?.enabled,
        false,
        'We hide the credits for Highcharts.'
      );

      assert.strictEqual(
        plotOptions?.series?.shadow,
        false,
        'We do not apply shadow to the graph line.'
      );

      assert.ok('timezoneOffset' in time, 'We account for timezone offset.');
    });
  });
});
