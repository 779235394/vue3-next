import Clipboard from 'clipboard'

export function isNull(value) {
  return value === null || value === undefined
}

export function isNotNull(value) {
  return value !== null && value !== undefined
}

export function isEmptyStr(str) {
  // return (str === undefined) || (!str) || (!/[^\s]/.test(str));
  return str === undefined || (!str && str !== 0 && str !== '0') || !/[^\s]/.test(str)
}

export const generateId = function() {
  return Math.floor(Math.random() * 100000 + Math.random() * 20000 + Math.random() * 5000)
}

export const deepClone = function(origin) {
  if (origin === undefined) {
    return undefined
  }

  return JSON.parse(JSON.stringify(origin))
}

export const overwriteObj = function(obj1, obj2) {
  /* 浅拷贝对象属性，obj2覆盖obj1 */
  // for (let prop in obj2) {
  //   if (obj2.hasOwnProperty(prop)) {
  //     obj1[prop] = obj2[prop]
  //   }
  // }

  Object.keys(obj2).forEach((prop) => {
    obj1[prop] = obj2[prop]
  })
}

export const addWindowResizeHandler = function(handler) {
  const oldHandler:any = window.onresize
  if (typeof window.onresize != 'function') {
    window.onresize = handler
  } else {
    window.onresize = function() {
      oldHandler()
      handler()
    }
  }
}

export const insertCustomCssToHead = function(cssCode: any, formId: any = '') {
  const head: any = document.getElementsByTagName('head')[0]
  let oldStyle: any = document.getElementById('vform-custom-css')
  if (oldStyle) {
    head.removeChild(oldStyle) // 先清除后插入！！
  }
  if (formId) {
    oldStyle = document.getElementById('vform-custom-css' + '-' + formId)
    !!oldStyle && head.removeChild(oldStyle) // 先清除后插入！！
  }

  const newStyle: any = document.createElement('style')
  newStyle.type = 'text/css'
  newStyle.rel = 'stylesheet'
  newStyle.id = formId ? 'vform-custom-css' + '-' + formId : 'vform-custom-css'
  try {
    newStyle.appendChild(document.createTextNode(cssCode))
  } catch (ex) {
    newStyle.styleSheet.cssText = cssCode
  }

  head.appendChild(newStyle)
}

export const insertGlobalFunctionsToHtml = function(functionsCode: any, formId: any = '') {
  const bodyEle: any = document.getElementsByTagName('body')[0]
  let oldScriptEle = document.getElementById('zhform_global_functions')
  !!oldScriptEle && bodyEle.removeChild(oldScriptEle) // 先清除后插入！！
  if (formId) {
    oldScriptEle = document.getElementById('zhform_global_functions' + '-' + formId)
    !!oldScriptEle && bodyEle.removeChild(oldScriptEle) // 先清除后插入！！
  }

  const newScriptEle = document.createElement('script')
  newScriptEle.id = formId ? 'zhform_global_functions' + '-' + formId : 'zhform_global_functions'
  newScriptEle.type = 'text/javascript'
  newScriptEle.innerHTML = functionsCode
  bodyEle.appendChild(newScriptEle)
}

export const optionExists = function(optionsObj, optionName) {
  if (!optionsObj) {
    return false
  }

  return Object.keys(optionsObj).indexOf(optionName) > -1
}

export const loadRemoteScript = function(srcPath, callback) {
  /* 加载远程js，加载成功后执行回调函数*/
  const sid = encodeURIComponent(srcPath)
  const oldScriptEle = document.getElementById(sid)

  if (!oldScriptEle) {
    let s: any = document.createElement('script')
    s.src = srcPath
    s.id = sid
    document.body.appendChild(s)

    s.onload = s.onreadystatechange = function(_, isAbort) {
      /* 借鉴自ace.js */
      if (isAbort || !s.readyState || s.readyState === 'loaded' || s.readyState === 'complete') {
        s = s.onload = s.onreadystatechange = null
        if (!isAbort) {
          callback()
        }
      }
    }
  }
}

export function traverseFieldWidgets(widgetList, handler) {
  widgetList.map((w) => {
    if (w.formItemFlag) {
      handler(w)
    } else if (w.type === 'grid') {
      w.cols.map((col) => {
        traverseFieldWidgets(col.widgetList, handler)
      })
    } else if (w.type === 'table') {
      w.rows.map((row) => {
        row.cols.map((cell) => {
          traverseFieldWidgets(cell.widgetList, handler)
        })
      })
    } else if (w.type === 'tab') {
      w.tabs.map((tab) => {
        traverseFieldWidgets(tab.widgetList, handler)
      })
    } else if (w.type === 'sub-form') {
      traverseFieldWidgets(w.widgetList, handler)
    } else if (w.category === 'container') {
      // 自定义容器
      traverseFieldWidgets(w.widgetList, handler)
    }
  })
}

export function traverseContainWidgets(widgetList, handler) {
  widgetList.map((w) => {
    if (w.category === 'container') {
      handler(w)
    }

    if (w.type === 'grid') {
      w.cols.map((col) => {
        traverseContainWidgets(col.widgetList, handler)
      })
    } else if (w.type === 'table') {
      w.rows.map((row) => {
        row.cols.map((cell) => {
          traverseContainWidgets(cell.widgetList, handler)
        })
      })
    } else if (w.type === 'tab') {
      w.tabs.map((tab) => {
        traverseContainWidgets(tab.widgetList, handler)
      })
    } else if (w.type === 'sub-form') {
      traverseContainWidgets(w.widgetList, handler)
    } else if (w.category === 'container') {
      // 自定义容器
      traverseContainWidgets(w.widgetList, handler)
    }
  })
}

export function traverseAllWidgets(widgetList, handler) {
  widgetList.map((w) => {
    handler(w)

    if (w.type === 'grid') {
      w.cols.map((col) => {
        handler(col)
        traverseAllWidgets(col.widgetList, handler)
      })
    } else if (w.type === 'table') {
      w.rows.map((row) => {
        row.cols.map((cell) => {
          handler(cell)
          traverseAllWidgets(cell.widgetList, handler)
        })
      })
    } else if (w.type === 'tab') {
      w.tabs.map((tab) => {
        traverseAllWidgets(tab.widgetList, handler)
      })
    } else if (w.type === 'sub-form') {
      traverseAllWidgets(w.widgetList, handler)
    } else if (w.category === 'container') {
      // 自定义容器
      traverseAllWidgets(w.widgetList, handler)
    }
  })
}

function handleWidgetForTraverse(widget, handler) {
  if (widget.category) {
    traverseFieldWidgetsOfContainer(widget, handler)
  } else if (widget.formItemFlag) {
    handler(widget)
  }
}

/**
 * 遍历容器内的字段组件
 * @param con
 * @param handler
 */
export function traverseFieldWidgetsOfContainer(con, handler) {
  if (con.type === 'grid') {
    con.cols.forEach((col) => {
      col.widgetList.forEach((cw) => {
        handleWidgetForTraverse(cw, handler)
      })
    })
  } else if (con.type === 'table') {
    con.rows.forEach((row) => {
      row.cols.forEach((cell) => {
        cell.widgetList.forEach((cw) => {
          handleWidgetForTraverse(cw, handler)
        })
      })
    })
  } else if (con.type === 'tab') {
    con.tabs.forEach((tab) => {
      tab.widgetList.forEach((cw) => {
        handleWidgetForTraverse(cw, handler)
      })
    })
  } else if (con.type === 'sub-form') {
    con.widgetList.forEach((cw) => {
      handleWidgetForTraverse(cw, handler)
    })
  } else if (con.category === 'container') {
    // 自定义容器
    con.widgetList.forEach((cw) => {
      handleWidgetForTraverse(cw, handler)
    })
  }
}

/**
 * 获取所有字段组件
 * @param widgetList
 * @returns {[]}
 */
export function getAllFieldWidgets(widgetList) {
  const result: any = []
  const handlerFn: any = (w) => {
    result.push({
      type: w.type,
      name: w.options.name,
      field: w,
    })
  }
  traverseFieldWidgets(widgetList, handlerFn)

  return result
}

/**
 * 获取所有容器组件
 * @param widgetList
 * @returns {[]}
 */
export function getAllContainerWidgets(widgetList) {
  const result: any = []
  const handlerFn: any = (w) => {
    result.push({
      type: w.type,
      name: w.options.name,
      container: w,
    })
  }
  traverseContainWidgets(widgetList, handlerFn)

  return result
}

export function copyToClipboard(content, clickEvent, $message, successMsg, errorMsg) {
  const clipboard: any = new Clipboard(clickEvent.target, {
    text: () => content,
  })

  clipboard.on('success', () => {
    $message.success(successMsg)
    clipboard.destroy()
  })

  clipboard.on('error', () => {
    $message.error(errorMsg)
    clipboard.destroy()
  })

  clipboard.onClick(clickEvent)
}

export function getQueryParam(variable) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }

  return undefined
}
