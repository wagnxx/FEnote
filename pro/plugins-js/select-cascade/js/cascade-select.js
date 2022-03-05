/**
 * 基于select标签的简单的cascade，
 * 主要需求：
 * 1. 顺序自动填充每一级 (完成)
 * 2. 只填充当前级，后序级全部制空（完成）
 * 功能
 * 1. 监听最后一次change事件（eg：onload，先加载select默认value，最后一次事件触发搜索等）
 * 2. 监听每一次change事件后返回值，最好做成迭代器
 * 3. 事件队列，后一个请求依赖前一个请求的值
 * 4. 事件队列，给一组已知的val，请求各自的值（场景，默认值填充）
 */
(function (g, f) {
  g.CascadeSelect = f();
})(this, function () {
  /**
   * params fieldList {array} 按顺序从高维度到低纬度字段
   */
  var CascadeSelect = function (fieldList, config) {
    this.fieldList = fieldList;
    this.defaultConfig = {
      valueStr: 'value',
      labelStr: 'label',
      init: true,
      init: true,
      autoFill: true
    };

    this.config = Object.assign({}, this.defaultConfig, config);
    config = this.config;

    this.fetchMethod = config.fetch;
    this.valueStr = config.valueStr;
    this.labelStr = config.labelStr;
    this.frozen = config.frozen;
    this.autoFill = config.autoFill;

    if (config.init) {
      this.init();
    }
  };
  var C = CascadeSelect;

  C.prototype.init = function () {
    if (!this.fieldList || !this.fieldList.length)
      throw 'fieldList must be not empty';
    this.fieldList.forEach((field) => {
      var $select = this.getElByField(field);
      !this.frozen && $select.on('change', this.events.change.bind(this));
      $select.one('once-change', this.events.oneceChange.bind(this));
    });
    // init first cascade
    this.initFirstCasdade();
  };
  /**
   * 初始化第一级数据
   */
  C.prototype.initFirstCasdade = async function () {
    var firstField = this.fieldList[0];
    var options = await this.fetch(firstField);
    var firstSel = this.getElByField(firstField);
    this.fillSelect(firstSel, options);
    firstSel.trigger('change');
  };
  /**
   * 初始化第一级数据
   */
  C.prototype.setDefaultValue = async function (val) {
    // 后几位可以为空，前几位必须不能为空，得验证
    var fieldListValue = this.fieldList.map((field) => {
      return {
        fieldName: field,
        value: val[field]
      };
    });

    if (!this.checkDefaultVal(fieldListValue)) {
      throw '靠前的字段必须不为空';
      return;
    }

    this.defaultFieldListValue = fieldListValue;
    //
    var firstField = this.fieldList[0];
    var defaultValue = this.defaultFieldListValue[0].value;
    var options = await this.fetch(firstField);
    options = options.map((item) => {
      if (item.value == defaultValue) {
        item.checked = true;
      }
      return item;
    });
    var firstSel = this.getElByField(firstField);
    this.fillSelect(firstSel, options);
    firstSel.val(defaultValue);
    firstSel.trigger('once-change');
  };
  C.prototype.checkDefaultVal = function (arr) {
    var varifyArr = [...arr].reverse().map((item) => item.value);
    var count = varifyArr.length;
    var i = 0;
    var curval = varifyArr[i];
    while (i < count - 1) {
      var next = varifyArr[i + 1];
      if (curval && !next) {
        return false;
      }
      curval = next;
      i++;
    }
    return true;
  };
  /**
   * 事件集合
   */
  C.prototype.events = {
    /**
     * select host change 事件触发时
     * should bind C
     */
    oneceChange: function (e) {
      var field = $(e.target).attr('field');
      if (!field) return;
      // field为当前触发元素，接下来要做（下一个都是相对于当前的field）
      // 1.通过 field，fetchData，数据返回后 填充next field，
      // 2.制空剩余field
      // 2. 触发下一个 change事件
      var fieldList = this.fieldList;
      var fieldIndex = fieldList.findIndex((fd) => fd == field);
      var remainFields = this.fieldList.slice(fieldIndex + 2);
      var nextField = null;
      if (fieldIndex < 0 || fieldIndex > fieldList.length - 1) {
      } else {
        nextField = fieldList[fieldIndex + 1];
      }
      // fetch data params
      var fieldValMap = this.getFieldsValue().map;
      // fetch next select options data and fill select
      this.fetch(nextField, fieldValMap).then((data) => {
        if (!data) return;
        var defaultValue = this.defaultFieldListValue[fieldIndex + 1].value;
        data = data.map((item) => {
          if (item.value == defaultValue) {
            item.checked = true;
          }
          return item;
        });

        var $el = nextField ? this.getElByField(nextField) : null;
        // fill  select
        $el && this.fillSelect($el, data);
        // fillRemainSelect
        remainFields.forEach((fd) => {
          var $fd = this.getElByField(fd);
          this.fillSelect($fd, []);
        });
        // nextField.trigger('once-change');
        $el && defaultValue && $el.val(defaultValue);
        $el && $el.trigger('once-change');
      });
    },
    /**
     * select host change 事件触发时
     * should bind C
     */
    change: function (e) {
      var field = $(e.target).attr('field');
      if (!field) return;
      // field为当前触发元素，接下来要做（下一个都是相对于当前的field）
      // 1.通过 field，fetchData，数据返回后 填充next field，
      // 2.制空剩余field
      // 2. 触发下一个 change事件
      var fieldList = this.fieldList;
      var fieldIndex = fieldList.findIndex((fd) => fd == field);
      var remainFields = this.fieldList.slice(fieldIndex + 2);
      var nextField = null;
      if (fieldIndex < 0 || fieldIndex > fieldList.length - 1) {
      } else {
        nextField = fieldList[fieldIndex + 1];
      }
      // fetch data params
      var fieldValMap = this.getFieldsValue().map;
      // fetch next select options data and fill select
      this.fetch(nextField, fieldValMap).then((data) => {
        if (!data) return;
        var $el = nextField ? this.getElByField(nextField) : null;
        // fill  select
        $el && this.fillSelect($el, data);
        // fillRemainSelect
        remainFields.forEach((fd) => {
          var $fd = this.getElByField(fd);
          this.fillSelect($fd, []);
        });
        // nextField.trigger('change');

        this.autoFill && $el && $el.trigger('change');
      });
    }
  };

  C.prototype.fillSelect = function ($el, list) {
    if (!Array.isArray(list)) return;
    var options = list.map(this.transListToOptions.bind(this)).join('');
    return $el.html(options);
  };
  /**
   * list数据转换成option dom字符串
   */
  C.prototype.transListToOptions = function (item) {
    var value = item[this.valueStr];
    var label = item[this.labelStr];
    var checkedStr = item.checked ? 'checked' : '';
    return (
      '<option value="' + value + '"  ' + checkedStr + '>' + label + '</option>'
    );
  };
  /**
   * 设置默认值并frozen
   */
  C.prototype.setFrozenVal = function (fieldList) {
    if (!Array.isArray(fieldList)) return;
    fieldList.forEach((fieldObj) => {
      var value = fieldObj[this.valueStr];
      var label = fieldObj[this.labelStr];
      var $el = this.getElByField(fieldObj.field);
      var _option =
        '<option value="' + value + '" disabled>' + label + '</option>';
      return $el.html(_option);
    });
  };
  /**
   * 设置默认值,的提供所有数据（默认选中值和列表）
   */
  C.prototype.setDefaultValueByFullData = function () {
    var fieldList = this.fieldList;
    if (!Array.isArray(fieldList)) return;
    fieldList.forEach((fieldObj) => {
      var value = fieldObj[this.valueStr];
      var label = fieldObj[this.labelStr];
      var $el = this.getElByField(fieldObj.field);
      var def = $el.attr('placeholder');
      var _option = '<option value="' + def + '">' + def + '</option>';
      return $el.html(_option);
    });
  };
  /**
   * 获取所有field的值
   */
  C.prototype.getFieldsValue = function () {
    var fieldList = this.fieldList;
    var fields = [];
    if (!Array.isArray(fieldList) || !fieldList.length) return fields;
    var map = {};
    var arrStr = [];
    var arrObj = fieldList
      .filter((field) => {
        var fieldEl = this.getElByField(field);
        return fieldEl.length;
      })
      .map((field) => {
        var fieldEl = this.getElByField(field);
        map[field] = fieldEl.val();
        arrStr.push(fieldEl.val());
        return {
          [field]: fieldEl.val()
        };
      });

    return { map, arrObj, arrStr };
  };
  /**
   * 获取对应的field元素
   */
  C.prototype.getElByField = function (field) {
    return $('[field=' + field + ']');
  };
  /**
   * 请求获取对应field的列表（组装好规范的结构）
   * @params level {string} 获取当前level的filed key ，为空表示最高级别level
   * @params fieldValMap {object} 所有field的value集合
   */
  C.prototype.fetch = function (level, fieldValMap = {}) {
    return this.fetchMethod(level, fieldValMap);
  };

  /**
   * 创建实例
   */

  C.createAutoCascade = function (fieldList, config) {
    return new C(fieldList, config);
  };

  return CascadeSelect;
});
/**
 * eg
 CascadeSelect.createAutoCascade(['district', 'subDistrict', 'building'], {
   fetchMethod: function (params) {
     // todo
     var url = '';
     return fetch(url,params)
    }
  })

*
*
*/

/**
 * 连续选中默认值
 */
// var curField = getFields();

// while (curField.next) {

//   curField = curField.next;
// }

/**
 * fetch error handle bind
 
 function fetchError(fn, json) {
   fn ? fn(json) : console.log('default log:', json);
 }
 
 getData()
   .then(res => {
     console.log('suc:', res);
   })
 .catch(fetchError.bind(null,err => console.log('bind Erro',err)))
  
 function getData() {
   return Promise.reject({err:'system error'})
 }


 */
// var a = 1000;
// obj = {
//   a: 111,
//   fn1() {
//      console.log(this.a)
//     },
//     fn2: function () {
//       console.log(this.a)

//     },
//     fn3 :  () => {

//       console.log(this.a)
//     }
// }

// // obj.fn1();
// // obj.fn2();
// // obj.fn3();
// var obj2 = {
//   a: 222
// }
// var fn
// fn = obj.fn3;

// fn.call(obj2)
