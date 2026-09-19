/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 862:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if (true) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(typeof window != 'undefined' ? window : this, function () {
  "use strict";

  function EvEmitter() {}
  var proto = EvEmitter.prototype;
  proto.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[eventName] = events[eventName] || [];
    // only add once
    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }
    return this;
  };
  proto.once = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // add event
    this.on(eventName, listener);
    // set once flag
    // set onceEvents hash
    var onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
    // set flag
    onceListeners[listener] = true;
    return this;
  };
  proto.off = function (eventName, listener) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    var index = listeners.indexOf(listener);
    if (index != -1) {
      listeners.splice(index, 1);
    }
    return this;
  };
  proto.emitEvent = function (eventName, args) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    // copy over to avoid interference if .off() in listener
    listeners = listeners.slice(0);
    args = args || [];
    // once stuff
    var onceListeners = this._onceEvents && this._onceEvents[eventName];
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      var isOnce = onceListeners && onceListeners[listener];
      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener);
        // unset once flag
        delete onceListeners[listener];
      }
      // trigger listener
      listener.apply(this, args);
    }
    return this;
  };
  proto.allOff = function () {
    delete this._events;
    delete this._onceEvents;
  };
  return EvEmitter;
});

/***/ }),

/***/ 769:
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
   true ? factory(exports) : 0;
})(this, function (exports) {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*!
   * ScrollSmoother 3.11.3
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */
  var gsap,
    _coreInitted,
    _win,
    _doc,
    _docEl,
    _body,
    _toArray,
    _clamp,
    ScrollTrigger,
    _mainInstance,
    _expo,
    _getVelocityProp,
    _inputObserver,
    _context,
    _onResizeDelayedCall,
    _windowExists = function _windowExists() {
      return typeof window !== "undefined";
    },
    _getGSAP = function _getGSAP() {
      return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
    },
    _round = function _round(value) {
      return Math.round(value * 100000) / 100000 || 0;
    },
    _autoDistance = function _autoDistance(el, progress) {
      var parent = el.parentNode || _docEl,
        b1 = el.getBoundingClientRect(),
        b2 = parent.getBoundingClientRect(),
        gapTop = b2.top - b1.top,
        gapBottom = b2.bottom - b1.bottom,
        change = (Math.abs(gapTop) > Math.abs(gapBottom) ? gapTop : gapBottom) / (1 - progress),
        offset = -change * progress,
        ratio,
        extraChange;
      if (change > 0) {
        ratio = b2.height / (_win.innerHeight + b2.height);
        extraChange = ratio === 0.5 ? b2.height * 2 : Math.min(b2.height, -change * ratio / (2 * ratio - 1)) * 2 * (progress || 1);
        offset += progress ? -extraChange * progress : -extraChange / 2;
        change += extraChange;
      }
      return {
        change: change,
        offset: offset
      };
    },
    _wrap = function _wrap(el) {
      var wrapper = _doc.querySelector(".ScrollSmoother-wrapper");
      if (!wrapper) {
        wrapper = _doc.createElement("div");
        wrapper.classList.add("ScrollSmoother-wrapper");
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
      }
      return wrapper;
    };
  var ScrollSmoother = function () {
    function ScrollSmoother(vars) {
      var _this = this;
      _coreInitted || ScrollSmoother.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollSmoother)");
      vars = this.vars = vars || {};
      _mainInstance && _mainInstance.kill();
      _mainInstance = this;
      _context(this);
      var _vars = vars,
        smoothTouch = _vars.smoothTouch,
        _onUpdate = _vars.onUpdate,
        onStop = _vars.onStop,
        smooth = _vars.smooth,
        onFocusIn = _vars.onFocusIn,
        normalizeScroll = _vars.normalizeScroll,
        content,
        wrapper,
        height,
        mainST,
        effects,
        sections,
        intervalID,
        wrapperCSS,
        contentCSS,
        paused,
        pausedNormalizer,
        recordedRefreshScroll,
        recordedRefreshScrub,
        self = this,
        resizeObserver = typeof ResizeObserver !== "undefined" && vars.autoResize !== false && new ResizeObserver(function () {
          return ScrollTrigger.isRefreshing || _onResizeDelayedCall.restart(true);
        }),
        effectsPrefix = vars.effectsPrefix || "",
        scrollFunc = ScrollTrigger.getScrollFunc(_win),
        smoothDuration = ScrollTrigger.isTouch === 1 ? smoothTouch === true ? 0.8 : parseFloat(smoothTouch) || 0 : smooth === 0 || smooth === false ? 0 : parseFloat(smooth) || 0.8,
        currentY = 0,
        delta = 0,
        startupPhase = 1,
        tracker = _getVelocityProp(0),
        updateVelocity = function updateVelocity() {
          return tracker.update(-currentY);
        },
        scroll = {
          y: 0
        },
        removeScroll = function removeScroll() {
          return content.style.overflow = "visible";
        },
        isProxyScrolling,
        killScrub = function killScrub(trigger) {
          trigger.update();
          var scrub = trigger.getTween();
          if (scrub) {
            scrub.pause();
            scrub._time = scrub._dur;
            scrub._tTime = scrub._tDur;
          }
          isProxyScrolling = false;
          trigger.animation.progress(trigger.progress, true);
        },
        render = function render(y, force) {
          if (y !== currentY && !paused || force) {
            if (smoothDuration) {
              content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
              content._gsap.y = y + "px";
            }
            delta = y - currentY;
            currentY = y;
            ScrollTrigger.isUpdating || ScrollTrigger.update();
          }
        },
        scrollTop = function scrollTop(value) {
          if (arguments.length) {
            value < 0 && (value = 0);
            scroll.y = -value;
            isProxyScrolling = true;
            paused ? currentY = -value : render(-value);
            ScrollTrigger.isRefreshing ? mainST.update() : scrollFunc(value);
            return this;
          }
          return -currentY;
        },
        lastFocusElement,
        _onFocusIn = function _onFocusIn(e) {
          wrapper.scrollTop = 0;
          if (e.target.contains && e.target.contains(wrapper) || onFocusIn && onFocusIn(_this, e) === false) {
            return;
          }
          ScrollTrigger.isInViewport(e.target) || e.target === lastFocusElement || _this.scrollTo(e.target, false, "center center");
          lastFocusElement = e.target;
        },
        adjustParallaxPosition = function adjustParallaxPosition(triggers, createdAfterEffectWasApplied) {
          var pins, start, dif, markers;
          effects.forEach(function (st) {
            pins = st.pins;
            markers = st.markers;
            triggers.forEach(function (trig) {
              if (st.trigger && trig.trigger && st !== trig && (trig.trigger === st.trigger || trig.pinnedContainer === st.trigger || st.trigger.contains(trig.trigger))) {
                start = trig.start;
                dif = (start - st.start - st.offset) / st.ratio - (start - st.start);
                pins.forEach(function (p) {
                  return dif -= p.distance / st.ratio - p.distance;
                });
                trig.setPositions(start + dif, trig.end + dif);
                trig.markerStart && markers.push(gsap.quickSetter([trig.markerStart, trig.markerEnd], "y", "px"));
                if (trig.pin && trig.end > 0) {
                  dif = trig.end - trig.start;
                  pins.push({
                    start: trig.start,
                    end: trig.end,
                    distance: dif,
                    trig: trig
                  });
                  st.setPositions(st.start, st.end + dif);
                  st.vars.onRefresh(st);
                }
              }
            });
          });
        },
        onRefresh = function onRefresh() {
          removeScroll();
          requestAnimationFrame(removeScroll);
          if (effects) {
            effects.forEach(function (st) {
              var start = st.start,
                end = st.auto ? Math.min(ScrollTrigger.maxScroll(st.scroller), st.end) : start + (st.end - start) / st.ratio,
                offset = (end - st.end) / 2;
              start -= offset;
              end -= offset;
              st.offset = offset || 0.0001;
              st.pins.length = 0;
              st.setPositions(Math.min(start, end), Math.max(start, end));
              st.vars.onRefresh(st);
            });
            adjustParallaxPosition(ScrollTrigger.sort());
          }
          tracker.reset();
        },
        addOnRefresh = function addOnRefresh() {
          return ScrollTrigger.addEventListener("refresh", onRefresh);
        },
        restoreEffects = function restoreEffects() {
          return effects && effects.forEach(function (st) {
            return st.vars.onRefresh(st);
          });
        },
        revertEffects = function revertEffects() {
          effects && effects.forEach(function (st) {
            return st.vars.onRefreshInit(st);
          });
          return restoreEffects;
        },
        effectValueGetter = function effectValueGetter(name, value, index, el) {
          return function () {
            var v = typeof value === "function" ? value(index, el) : value;
            v || v === 0 || (v = el.getAttribute("data-" + effectsPrefix + name) || (name === "speed" ? 1 : 0));
            el.setAttribute("data-" + effectsPrefix + name, v);
            return v === "auto" ? v : parseFloat(v);
          };
        },
        createEffect = function createEffect(el, speed, lag, index) {
          var getSpeed = effectValueGetter("speed", speed, index, el),
            getLag = effectValueGetter("lag", lag, index, el),
            startY = gsap.getProperty(el, "y"),
            cache = el._gsap,
            ratio,
            st,
            autoSpeed,
            scrub,
            progressOffset,
            yOffset,
            initDynamicValues = function initDynamicValues() {
              speed = getSpeed();
              lag = getLag();
              ratio = parseFloat(speed) || 1;
              autoSpeed = speed === "auto";
              progressOffset = autoSpeed ? 0 : 0.5;
              scrub && scrub.kill();
              scrub = lag && gsap.to(el, {
                ease: _expo,
                overwrite: false,
                y: "+=0",
                duration: lag
              });
              if (st) {
                st.ratio = ratio;
                st.autoSpeed = autoSpeed;
              }
            },
            revert = function revert() {
              cache.y = startY + "px";
              cache.renderTransform(1);
              initDynamicValues();
            },
            pins = [],
            markers = [],
            change = 0,
            updateChange = function updateChange(self) {
              if (autoSpeed) {
                revert();
                var auto = _autoDistance(el, _clamp(0, 1, -self.start / (self.end - self.start)));
                change = auto.change;
                yOffset = auto.offset;
              } else {
                change = (self.end - self.start) * (1 - ratio);
                yOffset = 0;
              }
              pins.forEach(function (p) {
                return change -= p.distance * (1 - ratio);
              });
              self.vars.onUpdate(self);
              scrub && scrub.progress(1);
            };
          initDynamicValues();
          if (ratio !== 1 || autoSpeed || scrub) {
            st = ScrollTrigger.create({
              trigger: autoSpeed ? el.parentNode : el,
              scroller: wrapper,
              scrub: true,
              refreshPriority: -999,
              onRefreshInit: revert,
              onRefresh: updateChange,
              onKill: function onKill(self) {
                var i = effects.indexOf(self);
                i >= 0 && effects.splice(i, 1);
                revert();
              },
              onUpdate: function onUpdate(self) {
                var y = startY + change * (self.progress - progressOffset),
                  i = pins.length,
                  extraY = 0,
                  pin,
                  scrollY,
                  end;
                if (self.offset) {
                  if (i) {
                    scrollY = -currentY;
                    end = self.end;
                    while (i--) {
                      pin = pins[i];
                      if (pin.trig.isActive || scrollY >= pin.start && scrollY <= pin.end) {
                        if (scrub) {
                          pin.trig.progress += pin.trig.direction < 0 ? 0.001 : -0.001;
                          pin.trig.update(0, 0, 1);
                          scrub.resetTo("y", parseFloat(cache.y), -delta, true);
                          startupPhase && scrub.progress(1);
                        }
                        return;
                      }
                      scrollY > pin.end && (extraY += pin.distance);
                      end -= pin.distance;
                    }
                    y = startY + extraY + change * ((gsap.utils.clamp(self.start, self.end, scrollY) - self.start - extraY) / (end - self.start) - progressOffset);
                  }
                  y = _round(y + yOffset);
                  markers.length && !autoSpeed && markers.forEach(function (setter) {
                    return setter(y - extraY);
                  });
                  if (scrub) {
                    scrub.resetTo("y", y, -delta, true);
                    startupPhase && scrub.progress(1);
                  } else {
                    cache.y = y + "px";
                    cache.renderTransform(1);
                  }
                }
              }
            });
            updateChange(st);
            gsap.core.getCache(st.trigger).stRevert = revertEffects;
            st.startY = startY;
            st.pins = pins;
            st.markers = markers;
            st.ratio = ratio;
            st.autoSpeed = autoSpeed;
            el.style.willChange = "transform";
          }
          return st;
        };
      addOnRefresh();
      ScrollTrigger.addEventListener("killAll", addOnRefresh);
      gsap.delayedCall(0.5, function () {
        return startupPhase = 0;
      });
      this.scrollTop = scrollTop;
      this.scrollTo = function (target, smooth, position) {
        var p = gsap.utils.clamp(0, ScrollTrigger.maxScroll(_win), isNaN(target) ? _this.offset(target, position) : +target);
        !smooth ? scrollTop(p) : paused ? gsap.to(_this, {
          duration: smoothDuration,
          scrollTop: p,
          overwrite: "auto",
          ease: _expo
        }) : scrollFunc(p);
      };
      this.offset = function (target, position) {
        target = _toArray(target)[0];
        var cssText = target.style.cssText,
          st = ScrollTrigger.create({
            trigger: target,
            start: position || "top top"
          }),
          y;
        effects && adjustParallaxPosition([st]);
        y = st.start;
        st.kill(false);
        target.style.cssText = cssText;
        gsap.core.getCache(target).uncache = 1;
        return y;
      };
      function refreshHeight() {
        height = content.clientHeight;
        content.style.overflow = "visible";
        _body.style.height = height + "px";
        return height - _win.innerHeight;
      }
      this.content = function (element) {
        if (arguments.length) {
          var newContent = _toArray(element || "#smooth-content")[0] || console.warn("ScrollSmoother needs a valid content element.") || _body.children[0];
          if (newContent !== content) {
            content = newContent;
            contentCSS = content.getAttribute("style") || "";
            resizeObserver && resizeObserver.observe(content);
            gsap.set(content, {
              overflow: "visible",
              width: "100%",
              boxSizing: "border-box",
              y: "+=0"
            });
            smoothDuration || gsap.set(content, {
              clearProps: "transform"
            });
          }
          return this;
        }
        return content;
      };
      this.wrapper = function (element) {
        if (arguments.length) {
          wrapper = _toArray(element || "#smooth-wrapper")[0] || _wrap(content);
          wrapperCSS = wrapper.getAttribute("style") || "";
          refreshHeight();
          gsap.set(wrapper, smoothDuration ? {
            overflow: "hidden",
            position: "fixed",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          } : {
            overflow: "visible",
            position: "relative",
            width: "100%",
            height: "auto",
            top: "auto",
            bottom: "auto",
            left: "auto",
            right: "auto"
          });
          return this;
        }
        return wrapper;
      };
      this.effects = function (targets, config) {
        var _effects;
        effects || (effects = []);
        if (!targets) {
          return effects.slice(0);
        }
        targets = _toArray(targets);
        targets.forEach(function (target) {
          var i = effects.length;
          while (i--) {
            effects[i].trigger === target && effects[i].kill();
          }
        });
        config = config || {};
        var _config = config,
          speed = _config.speed,
          lag = _config.lag,
          effectsToAdd = [],
          i,
          st;
        for (i = 0; i < targets.length; i++) {
          st = createEffect(targets[i], speed, lag, i);
          st && effectsToAdd.push(st);
        }
        (_effects = effects).push.apply(_effects, effectsToAdd);
        return effectsToAdd;
      };
      this.sections = function (targets, config) {
        var _sections;
        sections || (sections = []);
        if (!targets) {
          return sections.slice(0);
        }
        var newSections = _toArray(targets).map(function (el) {
          return ScrollTrigger.create({
            trigger: el,
            start: "top 120%",
            end: "bottom -20%",
            onToggle: function onToggle(self) {
              el.style.opacity = self.isActive ? "1" : "0";
              el.style.pointerEvents = self.isActive ? "all" : "none";
            }
          });
        });
        config && config.add ? (_sections = sections).push.apply(_sections, newSections) : sections = newSections.slice(0);
        return newSections;
      };
      this.content(vars.content);
      this.wrapper(vars.wrapper);
      this.render = function (y) {
        return render(y || y === 0 ? y : currentY);
      };
      this.getVelocity = function () {
        return tracker.getVelocity(-currentY);
      };
      ScrollTrigger.scrollerProxy(wrapper, {
        scrollTop: scrollTop,
        scrollHeight: function scrollHeight() {
          return refreshHeight() && _body.scrollHeight;
        },
        fixedMarkers: vars.fixedMarkers !== false && !!smoothDuration,
        content: content,
        getBoundingClientRect: function getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: _win.innerWidth,
            height: _win.innerHeight
          };
        }
      });
      ScrollTrigger.defaults({
        scroller: wrapper
      });
      var existingScrollTriggers = ScrollTrigger.getAll().filter(function (st) {
        return st.scroller === _win || st.scroller === wrapper;
      });
      existingScrollTriggers.forEach(function (st) {
        return st.revert(true);
      });
      mainST = ScrollTrigger.create({
        animation: gsap.fromTo(scroll, {
          y: 0
        }, {
          y: function y() {
            return -refreshHeight();
          },
          immediateRender: false,
          ease: "none",
          data: "ScrollSmoother",
          duration: 100,
          onUpdate: function onUpdate() {
            if (this._dur) {
              var force = isProxyScrolling;
              if (force) {
                killScrub(mainST);
                scroll.y = currentY;
              }
              render(scroll.y, force);
              updateVelocity();
              _onUpdate && !paused && _onUpdate(self);
            }
          }
        }),
        onRefreshInit: function onRefreshInit(self) {
          if (effects) {
            var pins = ScrollTrigger.getAll().filter(function (st) {
              return !!st.pin;
            });
            effects.forEach(function (st) {
              if (!st.vars.pinnedContainer) {
                pins.forEach(function (pinST) {
                  if (pinST.pin.contains(st.trigger)) {
                    var v = st.vars;
                    v.pinnedContainer = pinST.pin;
                    st.vars = null;
                    st.init(v, st.animation);
                  }
                });
              }
            });
          }
          var scrub = self.getTween();
          recordedRefreshScrub = scrub && scrub._end > scrub._dp._time;
          recordedRefreshScroll = currentY;
          scroll.y = 0;
          if (smoothDuration) {
            wrapper.style.pointerEvents = "none";
            wrapper.scrollTop = 0;
            setTimeout(function () {
              return wrapper.style.removeProperty("pointer-events");
            }, 50);
          }
        },
        onRefresh: function onRefresh(self) {
          self.animation.invalidate();
          self.setPositions(self.start, refreshHeight());
          recordedRefreshScrub || killScrub(self);
          scroll.y = -scrollFunc();
          render(scroll.y);
          startupPhase || self.animation.progress(gsap.utils.clamp(0, 1, recordedRefreshScroll / -self.end));
          if (recordedRefreshScrub) {
            self.progress -= 0.001;
            self.update();
          }
        },
        id: "ScrollSmoother",
        scroller: _win,
        invalidateOnRefresh: true,
        start: 0,
        refreshPriority: -9999,
        end: refreshHeight,
        onScrubComplete: function onScrubComplete() {
          tracker.reset();
          onStop && onStop(_this);
        },
        scrub: smoothDuration || true
      });
      this.smooth = function (value) {
        arguments.length && (smoothDuration = value || 0);
        return arguments.length ? mainST.scrubDuration(value) : mainST.getTween() ? mainST.getTween().duration() : 0;
      };
      mainST.getTween() && (mainST.getTween().vars.ease = vars.ease || _expo);
      this.scrollTrigger = mainST;
      vars.effects && this.effects(vars.effects === true ? "[data-" + effectsPrefix + "speed], [data-" + effectsPrefix + "lag]" : vars.effects, {});
      vars.sections && this.sections(vars.sections === true ? "[data-section]" : vars.sections);
      existingScrollTriggers.forEach(function (st) {
        st.vars.scroller = wrapper;
        st.init(st.vars, st.animation);
      });
      this.paused = function (value, allowNestedScroll) {
        if (arguments.length) {
          if (!!paused !== value) {
            if (value) {
              mainST.getTween() && mainST.getTween().pause();
              scrollFunc(-currentY);
              tracker.reset();
              pausedNormalizer = ScrollTrigger.normalizeScroll();
              pausedNormalizer && pausedNormalizer.disable();
              paused = ScrollTrigger.observe({
                preventDefault: true,
                type: "wheel,touch,scroll",
                debounce: false,
                allowClicks: true,
                onChangeY: function onChangeY() {
                  return scrollTop(-currentY);
                }
              });
              paused.nested = _inputObserver(_docEl, "wheel,touch,scroll", true, allowNestedScroll !== false);
            } else {
              paused.nested.kill();
              paused.kill();
              paused = 0;
              pausedNormalizer && pausedNormalizer.enable();
              mainST.progress = (-currentY - mainST.start) / (mainST.end - mainST.start);
              killScrub(mainST);
            }
          }
          return this;
        }
        return !!paused;
      };
      this.kill = this.revert = function () {
        _this.paused(false);
        killScrub(mainST);
        mainST.kill();
        var triggers = (effects || []).concat(sections || []),
          i = triggers.length;
        while (i--) {
          triggers[i].kill();
        }
        ScrollTrigger.scrollerProxy(wrapper);
        ScrollTrigger.removeEventListener("killAll", addOnRefresh);
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        wrapper.style.cssText = wrapperCSS;
        content.style.cssText = contentCSS;
        var defaults = ScrollTrigger.defaults({});
        defaults && defaults.scroller === wrapper && ScrollTrigger.defaults({
          scroller: _win
        });
        _this.normalizer && ScrollTrigger.normalizeScroll(false);
        clearInterval(intervalID);
        _mainInstance = null;
        resizeObserver && resizeObserver.disconnect();
        _body.style.removeProperty("height");
        _win.removeEventListener("focusin", _onFocusIn);
      };
      this.refresh = function (soft, force) {
        return mainST.refresh(soft, force);
      };
      if (normalizeScroll) {
        this.normalizer = ScrollTrigger.normalizeScroll(normalizeScroll === true ? {
          debounce: true,
          content: !smoothDuration && content
        } : normalizeScroll);
      }
      ScrollTrigger.config(vars);
      "overscrollBehavior" in _win.getComputedStyle(_body) && gsap.set([_body, _docEl], {
        overscrollBehavior: "none"
      });
      "scrollBehavior" in _win.getComputedStyle(_body) && gsap.set([_body, _docEl], {
        scrollBehavior: "auto"
      });
      _win.addEventListener("focusin", _onFocusIn);
      intervalID = setInterval(updateVelocity, 250);
      _doc.readyState === "loading" || requestAnimationFrame(function () {
        return ScrollTrigger.refresh();
      });
    }
    ScrollSmoother.register = function register(core) {
      if (!_coreInitted) {
        gsap = core || _getGSAP();
        if (_windowExists() && window.document) {
          _win = window;
          _doc = document;
          _docEl = _doc.documentElement;
          _body = _doc.body;
        }
        if (gsap) {
          _toArray = gsap.utils.toArray;
          _clamp = gsap.utils.clamp;
          _expo = gsap.parseEase("expo");
          _context = gsap.core.context || function () {};
          _onResizeDelayedCall = gsap.delayedCall(0.2, function () {
            return ScrollTrigger.isRefreshing || _mainInstance && _mainInstance.refresh();
          }).pause();
          ScrollTrigger = gsap.core.globals().ScrollTrigger;
          gsap.core.globals("ScrollSmoother", ScrollSmoother);
          if (_body && ScrollTrigger) {
            _getVelocityProp = ScrollTrigger.core._getVelocityProp;
            _inputObserver = ScrollTrigger.core._inputObserver;
            ScrollSmoother.refresh = ScrollTrigger.refresh;
            _coreInitted = 1;
          }
        }
      }
      return _coreInitted;
    };
    _createClass(ScrollSmoother, [{
      key: "progress",
      get: function get() {
        return this.scrollTrigger ? this.scrollTrigger.animation._time / 100 : 0;
      }
    }]);
    return ScrollSmoother;
  }();
  ScrollSmoother.version = "3.11.3";
  ScrollSmoother.create = function (vars) {
    return _mainInstance && vars && _mainInstance.content() === _toArray(vars.content)[0] ? _mainInstance : new ScrollSmoother(vars);
  };
  ScrollSmoother.get = function () {
    return _mainInstance;
  };
  _getGSAP() && gsap.registerPlugin(ScrollSmoother);
  exports.ScrollSmoother = ScrollSmoother;
  exports.default = ScrollSmoother;
  if (typeof window === 'undefined' || window !== exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  } else {
    delete window.default;
  }
});

/***/ }),

/***/ 434:
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
   true ? factory(exports) : 0;
})(this, function (exports) {
  'use strict';

  /*!
   * ScrollToPlugin 3.11.3
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */
  var gsap,
    _coreInitted,
    _window,
    _docEl,
    _body,
    _toArray,
    _config,
    _windowExists = function _windowExists() {
      return typeof window !== "undefined";
    },
    _getGSAP = function _getGSAP() {
      return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
    },
    _isString = function _isString(value) {
      return typeof value === "string";
    },
    _isFunction = function _isFunction(value) {
      return typeof value === "function";
    },
    _max = function _max(element, axis) {
      var dim = axis === "x" ? "Width" : "Height",
        scroll = "scroll" + dim,
        client = "client" + dim;
      return element === _window || element === _docEl || element === _body ? Math.max(_docEl[scroll], _body[scroll]) - (_window["inner" + dim] || _docEl[client] || _body[client]) : element[scroll] - element["offset" + dim];
    },
    _buildGetter = function _buildGetter(e, axis) {
      var p = "scroll" + (axis === "x" ? "Left" : "Top");
      if (e === _window) {
        if (e.pageXOffset != null) {
          p = "page" + axis.toUpperCase() + "Offset";
        } else {
          e = _docEl[p] != null ? _docEl : _body;
        }
      }
      return function () {
        return e[p];
      };
    },
    _clean = function _clean(value, index, target, targets) {
      _isFunction(value) && (value = value(index, target, targets));
      if (typeof value !== "object") {
        return _isString(value) && value !== "max" && value.charAt(1) !== "=" ? {
          x: value,
          y: value
        } : {
          y: value
        };
      } else if (value.nodeType) {
        return {
          y: value,
          x: value
        };
      } else {
        var result = {},
          p;
        for (p in value) {
          result[p] = p !== "onAutoKill" && _isFunction(value[p]) ? value[p](index, target, targets) : value[p];
        }
        return result;
      }
    },
    _getOffset = function _getOffset(element, container) {
      element = _toArray(element)[0];
      if (!element || !element.getBoundingClientRect) {
        return console.warn("scrollTo target doesn't exist. Using 0") || {
          x: 0,
          y: 0
        };
      }
      var rect = element.getBoundingClientRect(),
        isRoot = !container || container === _window || container === _body,
        cRect = isRoot ? {
          top: _docEl.clientTop - (_window.pageYOffset || _docEl.scrollTop || _body.scrollTop || 0),
          left: _docEl.clientLeft - (_window.pageXOffset || _docEl.scrollLeft || _body.scrollLeft || 0)
        } : container.getBoundingClientRect(),
        offsets = {
          x: rect.left - cRect.left,
          y: rect.top - cRect.top
        };
      if (!isRoot && container) {
        offsets.x += _buildGetter(container, "x")();
        offsets.y += _buildGetter(container, "y")();
      }
      return offsets;
    },
    _parseVal = function _parseVal(value, target, axis, currentVal, offset) {
      return !isNaN(value) && typeof value !== "object" ? parseFloat(value) - offset : _isString(value) && value.charAt(1) === "=" ? parseFloat(value.substr(2)) * (value.charAt(0) === "-" ? -1 : 1) + currentVal - offset : value === "max" ? _max(target, axis) - offset : Math.min(_max(target, axis), _getOffset(value, target)[axis] - offset);
    },
    _initCore = function _initCore() {
      gsap = _getGSAP();
      if (_windowExists() && gsap && document.body) {
        _window = window;
        _body = document.body;
        _docEl = document.documentElement;
        _toArray = gsap.utils.toArray;
        gsap.config({
          autoKillThreshold: 7
        });
        _config = gsap.config();
        _coreInitted = 1;
      }
    };
  var ScrollToPlugin = {
    version: "3.11.3",
    name: "scrollTo",
    rawVars: 1,
    register: function register(core) {
      gsap = core;
      _initCore();
    },
    init: function init(target, value, tween, index, targets) {
      _coreInitted || _initCore();
      var data = this,
        snapType = gsap.getProperty(target, "scrollSnapType");
      data.isWin = target === _window;
      data.target = target;
      data.tween = tween;
      value = _clean(value, index, target, targets);
      data.vars = value;
      data.autoKill = !!value.autoKill;
      data.getX = _buildGetter(target, "x");
      data.getY = _buildGetter(target, "y");
      data.x = data.xPrev = data.getX();
      data.y = data.yPrev = data.getY();
      gsap.getProperty(target, "scrollBehavior") === "smooth" && gsap.set(target, {
        scrollBehavior: "auto"
      });
      if (snapType && snapType !== "none") {
        data.snap = 1;
        data.snapInline = target.style.scrollSnapType;
        target.style.scrollSnapType = "none";
      }
      if (value.x != null) {
        data.add(data, "x", data.x, _parseVal(value.x, target, "x", data.x, value.offsetX || 0), index, targets);
        data._props.push("scrollTo_x");
      } else {
        data.skipX = 1;
      }
      if (value.y != null) {
        data.add(data, "y", data.y, _parseVal(value.y, target, "y", data.y, value.offsetY || 0), index, targets);
        data._props.push("scrollTo_y");
      } else {
        data.skipY = 1;
      }
    },
    render: function render(ratio, data) {
      var pt = data._pt,
        target = data.target,
        tween = data.tween,
        autoKill = data.autoKill,
        xPrev = data.xPrev,
        yPrev = data.yPrev,
        isWin = data.isWin,
        snap = data.snap,
        snapInline = data.snapInline,
        x,
        y,
        yDif,
        xDif,
        threshold;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      x = isWin || !data.skipX ? data.getX() : xPrev;
      y = isWin || !data.skipY ? data.getY() : yPrev;
      yDif = y - yPrev;
      xDif = x - xPrev;
      threshold = _config.autoKillThreshold;
      if (data.x < 0) {
        data.x = 0;
      }
      if (data.y < 0) {
        data.y = 0;
      }
      if (autoKill) {
        if (!data.skipX && (xDif > threshold || xDif < -threshold) && x < _max(target, "x")) {
          data.skipX = 1;
        }
        if (!data.skipY && (yDif > threshold || yDif < -threshold) && y < _max(target, "y")) {
          data.skipY = 1;
        }
        if (data.skipX && data.skipY) {
          tween.kill();
          data.vars.onAutoKill && data.vars.onAutoKill.apply(tween, data.vars.onAutoKillParams || []);
        }
      }
      if (isWin) {
        _window.scrollTo(!data.skipX ? data.x : x, !data.skipY ? data.y : y);
      } else {
        data.skipY || (target.scrollTop = data.y);
        data.skipX || (target.scrollLeft = data.x);
      }
      if (snap && (ratio === 1 || ratio === 0)) {
        y = target.scrollTop;
        x = target.scrollLeft;
        snapInline ? target.style.scrollSnapType = snapInline : target.style.removeProperty("scroll-snap-type");
        target.scrollTop = y + 1;
        target.scrollLeft = x + 1;
        target.scrollTop = y;
        target.scrollLeft = x;
      }
      data.xPrev = data.x;
      data.yPrev = data.y;
    },
    kill: function kill(property) {
      var both = property === "scrollTo";
      if (both || property === "scrollTo_x") {
        this.skipX = 1;
      }
      if (both || property === "scrollTo_y") {
        this.skipY = 1;
      }
    }
  };
  ScrollToPlugin.max = _max;
  ScrollToPlugin.getOffset = _getOffset;
  ScrollToPlugin.buildGetter = _buildGetter;
  _getGSAP() && gsap.registerPlugin(ScrollToPlugin);
  exports.ScrollToPlugin = ScrollToPlugin;
  exports.default = ScrollToPlugin;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});

/***/ }),

/***/ 752:
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
   true ? factory(exports) : 0;
})(this, function (exports) {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*!
   * Observer 3.11.3
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */
  var gsap,
    _coreInitted,
    _clamp,
    _win,
    _doc,
    _docEl,
    _body,
    _isTouch,
    _pointerType,
    ScrollTrigger,
    _root,
    _normalizer,
    _eventTypes,
    _getGSAP = function _getGSAP() {
      return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
    },
    _startup = 1,
    _observers = [],
    _scrollers = [],
    _proxies = [],
    _getTime = Date.now,
    _bridge = function _bridge(name, value) {
      return value;
    },
    _integrate = function _integrate() {
      var core = ScrollTrigger.core,
        data = core.bridge || {},
        scrollers = core._scrollers,
        proxies = core._proxies;
      scrollers.push.apply(scrollers, _scrollers);
      proxies.push.apply(proxies, _proxies);
      _scrollers = scrollers;
      _proxies = proxies;
      _bridge = function _bridge(name, value) {
        return data[name](value);
      };
    },
    _getProxyProp = function _getProxyProp(element, property) {
      return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
    },
    _isViewport = function _isViewport(el) {
      return !!~_root.indexOf(el);
    },
    _addListener = function _addListener(element, type, func, nonPassive, capture) {
      return element.addEventListener(type, func, {
        passive: !nonPassive,
        capture: !!capture
      });
    },
    _removeListener = function _removeListener(element, type, func, capture) {
      return element.removeEventListener(type, func, !!capture);
    },
    _scrollLeft = "scrollLeft",
    _scrollTop = "scrollTop",
    _onScroll = function _onScroll() {
      return _normalizer && _normalizer.isPressed || _scrollers.cache++;
    },
    _scrollCacheFunc = function _scrollCacheFunc(f, doNotCache) {
      var cachingFunc = function cachingFunc(value) {
        if (value || value === 0) {
          _startup && (_win.history.scrollRestoration = "manual");
          var isNormalizing = _normalizer && _normalizer.isPressed;
          value = cachingFunc.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0);
          f(value);
          cachingFunc.cacheID = _scrollers.cache;
          isNormalizing && _bridge("ss", value);
        } else if (doNotCache || _scrollers.cache !== cachingFunc.cacheID || _bridge("ref")) {
          cachingFunc.cacheID = _scrollers.cache;
          cachingFunc.v = f();
        }
        return cachingFunc.v + cachingFunc.offset;
      };
      cachingFunc.offset = 0;
      return f && cachingFunc;
    },
    _horizontal = {
      s: _scrollLeft,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: _scrollCacheFunc(function (value) {
        return arguments.length ? _win.scrollTo(value, _vertical.sc()) : _win.pageXOffset || _doc[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
      })
    },
    _vertical = {
      s: _scrollTop,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: _horizontal,
      sc: _scrollCacheFunc(function (value) {
        return arguments.length ? _win.scrollTo(_horizontal.sc(), value) : _win.pageYOffset || _doc[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
      })
    },
    _getTarget = function _getTarget(t) {
      return gsap.utils.toArray(t)[0] || (typeof t === "string" && gsap.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
    },
    _getScrollFunc = function _getScrollFunc(element, _ref) {
      var s = _ref.s,
        sc = _ref.sc;
      _isViewport(element) && (element = _doc.scrollingElement || _docEl);
      var i = _scrollers.indexOf(element),
        offset = sc === _vertical.sc ? 1 : 2;
      !~i && (i = _scrollers.push(element) - 1);
      _scrollers[i + offset] || element.addEventListener("scroll", _onScroll);
      var prev = _scrollers[i + offset],
        func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport(element) ? sc : _scrollCacheFunc(function (value) {
          return arguments.length ? element[s] = value : element[s];
        })));
      func.target = element;
      prev || (func.smooth = gsap.getProperty(element, "scrollBehavior") === "smooth");
      return func;
    },
    _getVelocityProp = function _getVelocityProp(value, minTimeRefresh, useDelta) {
      var v1 = value,
        v2 = value,
        t1 = _getTime(),
        t2 = t1,
        min = minTimeRefresh || 50,
        dropToZeroTime = Math.max(500, min * 3),
        update = function update(value, force) {
          var t = _getTime();
          if (force || t - t1 > min) {
            v2 = v1;
            v1 = value;
            t2 = t1;
            t1 = t;
          } else if (useDelta) {
            v1 += value;
          } else {
            v1 = v2 + (value - v2) / (t - t2) * (t1 - t2);
          }
        },
        reset = function reset() {
          v2 = v1 = useDelta ? 0 : v1;
          t2 = t1 = 0;
        },
        getVelocity = function getVelocity(latestValue) {
          var tOld = t2,
            vOld = v2,
            t = _getTime();
          (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
          return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1000;
        };
      return {
        update: update,
        reset: reset,
        getVelocity: getVelocity
      };
    },
    _getEvent = function _getEvent(e, preventDefault) {
      preventDefault && !e._gsapAllow && e.preventDefault();
      return e.changedTouches ? e.changedTouches[0] : e;
    },
    _getAbsoluteMax = function _getAbsoluteMax(a) {
      var max = Math.max.apply(Math, a),
        min = Math.min.apply(Math, a);
      return Math.abs(max) >= Math.abs(min) ? max : min;
    },
    _setScrollTrigger = function _setScrollTrigger() {
      ScrollTrigger = gsap.core.globals().ScrollTrigger;
      ScrollTrigger && ScrollTrigger.core && _integrate();
    },
    _initCore = function _initCore(core) {
      gsap = core || _getGSAP();
      if (gsap && typeof document !== "undefined" && document.body) {
        _win = window;
        _doc = document;
        _docEl = _doc.documentElement;
        _body = _doc.body;
        _root = [_win, _doc, _docEl, _body];
        _clamp = gsap.utils.clamp;
        _pointerType = "onpointerenter" in _body ? "pointer" : "mouse";
        _isTouch = Observer.isTouch = _win.matchMedia && _win.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
        _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
        setTimeout(function () {
          return _startup = 0;
        }, 500);
        _setScrollTrigger();
        _coreInitted = 1;
      }
      return _coreInitted;
    };
  _horizontal.op = _vertical;
  _scrollers.cache = 0;
  var Observer = function () {
    function Observer(vars) {
      this.init(vars);
    }
    var _proto = Observer.prototype;
    _proto.init = function init(vars) {
      _coreInitted || _initCore(gsap) || console.warn("Please gsap.registerPlugin(Observer)");
      ScrollTrigger || _setScrollTrigger();
      var tolerance = vars.tolerance,
        dragMinimum = vars.dragMinimum,
        type = vars.type,
        target = vars.target,
        lineHeight = vars.lineHeight,
        debounce = vars.debounce,
        preventDefault = vars.preventDefault,
        onStop = vars.onStop,
        onStopDelay = vars.onStopDelay,
        ignore = vars.ignore,
        wheelSpeed = vars.wheelSpeed,
        event = vars.event,
        onDragStart = vars.onDragStart,
        onDragEnd = vars.onDragEnd,
        onDrag = vars.onDrag,
        onPress = vars.onPress,
        onRelease = vars.onRelease,
        onRight = vars.onRight,
        onLeft = vars.onLeft,
        onUp = vars.onUp,
        onDown = vars.onDown,
        onChangeX = vars.onChangeX,
        onChangeY = vars.onChangeY,
        onChange = vars.onChange,
        onToggleX = vars.onToggleX,
        onToggleY = vars.onToggleY,
        onHover = vars.onHover,
        onHoverEnd = vars.onHoverEnd,
        onMove = vars.onMove,
        ignoreCheck = vars.ignoreCheck,
        isNormalizer = vars.isNormalizer,
        onGestureStart = vars.onGestureStart,
        onGestureEnd = vars.onGestureEnd,
        onWheel = vars.onWheel,
        onEnable = vars.onEnable,
        onDisable = vars.onDisable,
        onClick = vars.onClick,
        scrollSpeed = vars.scrollSpeed,
        capture = vars.capture,
        allowClicks = vars.allowClicks,
        lockAxis = vars.lockAxis,
        onLockAxis = vars.onLockAxis;
      this.target = target = _getTarget(target) || _docEl;
      this.vars = vars;
      ignore && (ignore = gsap.utils.toArray(ignore));
      tolerance = tolerance || 1e-9;
      dragMinimum = dragMinimum || 0;
      wheelSpeed = wheelSpeed || 1;
      scrollSpeed = scrollSpeed || 1;
      type = type || "wheel,touch,pointer";
      debounce = debounce !== false;
      lineHeight || (lineHeight = parseFloat(_win.getComputedStyle(_body).lineHeight) || 22);
      var id,
        onStopDelayedCall,
        dragged,
        moved,
        wheeled,
        locked,
        axis,
        self = this,
        prevDeltaX = 0,
        prevDeltaY = 0,
        scrollFuncX = _getScrollFunc(target, _horizontal),
        scrollFuncY = _getScrollFunc(target, _vertical),
        scrollX = scrollFuncX(),
        scrollY = scrollFuncY(),
        limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown",
        isViewport = _isViewport(target),
        ownerDoc = target.ownerDocument || _doc,
        deltaX = [0, 0, 0],
        deltaY = [0, 0, 0],
        onClickTime = 0,
        clickCapture = function clickCapture() {
          return onClickTime = _getTime();
        },
        _ignoreCheck = function _ignoreCheck(e, isPointerOrTouch) {
          return (self.event = e) && ignore && ~ignore.indexOf(e.target) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
        },
        onStopFunc = function onStopFunc() {
          self._vx.reset();
          self._vy.reset();
          onStopDelayedCall.pause();
          onStop && onStop(self);
        },
        update = function update() {
          var dx = self.deltaX = _getAbsoluteMax(deltaX),
            dy = self.deltaY = _getAbsoluteMax(deltaY),
            changedX = Math.abs(dx) >= tolerance,
            changedY = Math.abs(dy) >= tolerance;
          onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);
          if (changedX) {
            onRight && self.deltaX > 0 && onRight(self);
            onLeft && self.deltaX < 0 && onLeft(self);
            onChangeX && onChangeX(self);
            onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
            prevDeltaX = self.deltaX;
            deltaX[0] = deltaX[1] = deltaX[2] = 0;
          }
          if (changedY) {
            onDown && self.deltaY > 0 && onDown(self);
            onUp && self.deltaY < 0 && onUp(self);
            onChangeY && onChangeY(self);
            onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
            prevDeltaY = self.deltaY;
            deltaY[0] = deltaY[1] = deltaY[2] = 0;
          }
          if (moved || dragged) {
            onMove && onMove(self);
            if (dragged) {
              onDrag(self);
              dragged = false;
            }
            moved = false;
          }
          locked && !(locked = false) && onLockAxis && onLockAxis(self);
          if (wheeled) {
            onWheel(self);
            wheeled = false;
          }
          id = 0;
        },
        onDelta = function onDelta(x, y, index) {
          deltaX[index] += x;
          deltaY[index] += y;
          self._vx.update(x);
          self._vy.update(y);
          debounce ? id || (id = requestAnimationFrame(update)) : update();
        },
        onTouchOrPointerDelta = function onTouchOrPointerDelta(x, y) {
          if (lockAxis && !axis) {
            self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
            locked = true;
          }
          if (axis !== "y") {
            deltaX[2] += x;
            self._vx.update(x, true);
          }
          if (axis !== "x") {
            deltaY[2] += y;
            self._vy.update(y, true);
          }
          debounce ? id || (id = requestAnimationFrame(update)) : update();
        },
        _onDrag = function _onDrag(e) {
          if (_ignoreCheck(e, 1)) {
            return;
          }
          e = _getEvent(e, preventDefault);
          var x = e.clientX,
            y = e.clientY,
            dx = x - self.x,
            dy = y - self.y,
            isDragging = self.isDragging;
          self.x = x;
          self.y = y;
          if (isDragging || Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum) {
            onDrag && (dragged = true);
            isDragging || (self.isDragging = true);
            onTouchOrPointerDelta(dx, dy);
            isDragging || onDragStart && onDragStart(self);
          }
        },
        _onPress = self.onPress = function (e) {
          if (_ignoreCheck(e, 1)) {
            return;
          }
          self.axis = axis = null;
          onStopDelayedCall.pause();
          self.isPressed = true;
          e = _getEvent(e);
          prevDeltaX = prevDeltaY = 0;
          self.startX = self.x = e.clientX;
          self.startY = self.y = e.clientY;
          self._vx.reset();
          self._vy.reset();
          _addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, preventDefault, true);
          self.deltaX = self.deltaY = 0;
          onPress && onPress(self);
        },
        _onRelease = function _onRelease(e) {
          if (_ignoreCheck(e, 1)) {
            return;
          }
          _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
          var wasDragging = self.isDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3),
            eventData = _getEvent(e);
          if (!wasDragging) {
            self._vx.reset();
            self._vy.reset();
            if (preventDefault && allowClicks) {
              gsap.delayedCall(0.08, function () {
                if (_getTime() - onClickTime > 300 && !e.defaultPrevented) {
                  if (e.target.click) {
                    e.target.click();
                  } else if (ownerDoc.createEvent) {
                    var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                    syntheticEvent.initMouseEvent("click", true, true, _win, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                    e.target.dispatchEvent(syntheticEvent);
                  }
                }
              });
            }
          }
          self.isDragging = self.isGesturing = self.isPressed = false;
          onStop && !isNormalizer && onStopDelayedCall.restart(true);
          onDragEnd && wasDragging && onDragEnd(self);
          onRelease && onRelease(self, wasDragging);
        },
        _onGestureStart = function _onGestureStart(e) {
          return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
        },
        _onGestureEnd = function _onGestureEnd() {
          return (self.isGesturing = false) || onGestureEnd(self);
        },
        onScroll = function onScroll(e) {
          if (_ignoreCheck(e)) {
            return;
          }
          var x = scrollFuncX(),
            y = scrollFuncY();
          onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
          scrollX = x;
          scrollY = y;
          onStop && onStopDelayedCall.restart(true);
        },
        _onWheel = function _onWheel(e) {
          if (_ignoreCheck(e)) {
            return;
          }
          e = _getEvent(e, preventDefault);
          onWheel && (wheeled = true);
          var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win.innerHeight : 1) * wheelSpeed;
          onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
          onStop && !isNormalizer && onStopDelayedCall.restart(true);
        },
        _onMove = function _onMove(e) {
          if (_ignoreCheck(e)) {
            return;
          }
          var x = e.clientX,
            y = e.clientY,
            dx = x - self.x,
            dy = y - self.y;
          self.x = x;
          self.y = y;
          moved = true;
          (dx || dy) && onTouchOrPointerDelta(dx, dy);
        },
        _onHover = function _onHover(e) {
          self.event = e;
          onHover(self);
        },
        _onHoverEnd = function _onHoverEnd(e) {
          self.event = e;
          onHoverEnd(self);
        },
        _onClick = function _onClick(e) {
          return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
        };
      onStopDelayedCall = self._dc = gsap.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
      self.deltaX = self.deltaY = 0;
      self._vx = _getVelocityProp(0, 50, true);
      self._vy = _getVelocityProp(0, 50, true);
      self.scrollX = scrollFuncX;
      self.scrollY = scrollFuncY;
      self.isDragging = self.isGesturing = self.isPressed = false;
      self.enable = function (e) {
        if (!self.isEnabled) {
          _addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          type.indexOf("scroll") >= 0 && _addListener(isViewport ? ownerDoc : target, "scroll", onScroll, preventDefault, capture);
          type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, preventDefault, capture);
          if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
            _addListener(target, _eventTypes[0], _onPress, preventDefault, capture);
            _addListener(ownerDoc, _eventTypes[2], _onRelease);
            _addListener(ownerDoc, _eventTypes[3], _onRelease);
            allowClicks && _addListener(target, "click", clickCapture, false, true);
            onClick && _addListener(target, "click", _onClick);
            onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
            onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
            onHover && _addListener(target, _pointerType + "enter", _onHover);
            onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
            onMove && _addListener(target, _pointerType + "move", _onMove);
          }
          self.isEnabled = true;
          e && e.type && _onPress(e);
          onEnable && onEnable(self);
        }
        return self;
      };
      self.disable = function () {
        if (self.isEnabled) {
          _observers.filter(function (o) {
            return o !== self && _isViewport(o.target);
          }).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          if (self.isPressed) {
            self._vx.reset();
            self._vy.reset();
            _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
          }
          _removeListener(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
          _removeListener(target, "wheel", _onWheel, capture);
          _removeListener(target, _eventTypes[0], _onPress, capture);
          _removeListener(ownerDoc, _eventTypes[2], _onRelease);
          _removeListener(ownerDoc, _eventTypes[3], _onRelease);
          _removeListener(target, "click", clickCapture, true);
          _removeListener(target, "click", _onClick);
          _removeListener(ownerDoc, "gesturestart", _onGestureStart);
          _removeListener(ownerDoc, "gestureend", _onGestureEnd);
          _removeListener(target, _pointerType + "enter", _onHover);
          _removeListener(target, _pointerType + "leave", _onHoverEnd);
          _removeListener(target, _pointerType + "move", _onMove);
          self.isEnabled = self.isPressed = self.isDragging = false;
          onDisable && onDisable(self);
        }
      };
      self.kill = function () {
        self.disable();
        var i = _observers.indexOf(self);
        i >= 0 && _observers.splice(i, 1);
        _normalizer === self && (_normalizer = 0);
      };
      _observers.push(self);
      isNormalizer && _isViewport(target) && (_normalizer = self);
      self.enable(event);
    };
    _createClass(Observer, [{
      key: "velocityX",
      get: function get() {
        return this._vx.getVelocity();
      }
    }, {
      key: "velocityY",
      get: function get() {
        return this._vy.getVelocity();
      }
    }]);
    return Observer;
  }();
  Observer.version = "3.11.3";
  Observer.create = function (vars) {
    return new Observer(vars);
  };
  Observer.register = _initCore;
  Observer.getAll = function () {
    return _observers.slice();
  };
  Observer.getById = function (id) {
    return _observers.filter(function (o) {
      return o.vars.id === id;
    })[0];
  };
  _getGSAP() && gsap.registerPlugin(Observer);

  /*!
   * ScrollTrigger 3.11.3
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */

  var gsap$1,
    _coreInitted$1,
    _win$1,
    _doc$1,
    _docEl$1,
    _body$1,
    _root$1,
    _resizeDelay,
    _toArray,
    _clamp$1,
    _time2,
    _syncInterval,
    _refreshing,
    _pointerIsDown,
    _transformProp,
    _i,
    _prevWidth,
    _prevHeight,
    _autoRefresh,
    _sort,
    _suppressOverwrites,
    _ignoreResize,
    _normalizer$1,
    _ignoreMobileResize,
    _baseScreenHeight,
    _baseScreenWidth,
    _fixIOSBug,
    _context,
    _scrollRestoration,
    _limitCallbacks,
    _startup$1 = 1,
    _getTime$1 = Date.now,
    _time1 = _getTime$1(),
    _lastScrollTime = 0,
    _enabled = 0,
    _pointerDownHandler = function _pointerDownHandler() {
      return _pointerIsDown = 1;
    },
    _pointerUpHandler = function _pointerUpHandler() {
      return _pointerIsDown = 0;
    },
    _passThrough = function _passThrough(v) {
      return v;
    },
    _round = function _round(value) {
      return Math.round(value * 100000) / 100000 || 0;
    },
    _windowExists = function _windowExists() {
      return typeof window !== "undefined";
    },
    _getGSAP$1 = function _getGSAP() {
      return gsap$1 || _windowExists() && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1;
    },
    _isViewport$1 = function _isViewport(e) {
      return !!~_root$1.indexOf(e);
    },
    _getBoundsFunc = function _getBoundsFunc(element) {
      return _getProxyProp(element, "getBoundingClientRect") || (_isViewport$1(element) ? function () {
        _winOffsets.width = _win$1.innerWidth;
        _winOffsets.height = _win$1.innerHeight;
        return _winOffsets;
      } : function () {
        return _getBounds(element);
      });
    },
    _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref) {
      var d = _ref.d,
        d2 = _ref.d2,
        a = _ref.a;
      return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function () {
        return a()[d];
      } : function () {
        return (isViewport ? _win$1["inner" + d2] : scroller["client" + d2]) || 0;
      };
    },
    _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
      return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function () {
        return _winOffsets;
      };
    },
    _maxScroll = function _maxScroll(element, _ref2) {
      var s = _ref2.s,
        d2 = _ref2.d2,
        d = _ref2.d,
        a = _ref2.a;
      return (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport$1(element) ? (_docEl$1[s] || _body$1[s]) - (_win$1["inner" + d2] || _docEl$1["client" + d2] || _body$1["client" + d2]) : element[s] - element["offset" + d2];
    },
    _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
      for (var i = 0; i < _autoRefresh.length; i += 3) {
        (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
      }
    },
    _isString = function _isString(value) {
      return typeof value === "string";
    },
    _isFunction = function _isFunction(value) {
      return typeof value === "function";
    },
    _isNumber = function _isNumber(value) {
      return typeof value === "number";
    },
    _isObject = function _isObject(value) {
      return typeof value === "object";
    },
    _endAnimation = function _endAnimation(animation, reversed, pause) {
      return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
    },
    _callback = function _callback(self, func) {
      if (self.enabled) {
        var result = func(self);
        result && result.totalTime && (self.callbackAnimation = result);
      }
    },
    _abs = Math.abs,
    _left = "left",
    _top = "top",
    _right = "right",
    _bottom = "bottom",
    _width = "width",
    _height = "height",
    _Right = "Right",
    _Left = "Left",
    _Top = "Top",
    _Bottom = "Bottom",
    _padding = "padding",
    _margin = "margin",
    _Width = "Width",
    _Height = "Height",
    _px = "px",
    _getComputedStyle = function _getComputedStyle(element) {
      return _win$1.getComputedStyle(element);
    },
    _makePositionable = function _makePositionable(element) {
      var position = _getComputedStyle(element).position;
      element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
    },
    _setDefaults = function _setDefaults(obj, defaults) {
      for (var p in defaults) {
        p in obj || (obj[p] = defaults[p]);
      }
      return obj;
    },
    _getBounds = function _getBounds(element, withoutTransforms) {
      var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap$1.to(element, {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          skewX: 0,
          skewY: 0
        }).progress(1),
        bounds = element.getBoundingClientRect();
      tween && tween.progress(0).kill();
      return bounds;
    },
    _getSize = function _getSize(element, _ref3) {
      var d2 = _ref3.d2;
      return element["offset" + d2] || element["client" + d2] || 0;
    },
    _getLabelRatioArray = function _getLabelRatioArray(timeline) {
      var a = [],
        labels = timeline.labels,
        duration = timeline.duration(),
        p;
      for (p in labels) {
        a.push(labels[p] / duration);
      }
      return a;
    },
    _getClosestLabel = function _getClosestLabel(animation) {
      return function (value) {
        return gsap$1.utils.snap(_getLabelRatioArray(animation), value);
      };
    },
    _snapDirectional = function _snapDirectional(snapIncrementOrArray) {
      var snap = gsap$1.utils.snap(snapIncrementOrArray),
        a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function (a, b) {
          return a - b;
        });
      return a ? function (value, direction, threshold) {
        if (threshold === void 0) {
          threshold = 1e-3;
        }
        var i;
        if (!direction) {
          return snap(value);
        }
        if (direction > 0) {
          value -= threshold;
          for (i = 0; i < a.length; i++) {
            if (a[i] >= value) {
              return a[i];
            }
          }
          return a[i - 1];
        } else {
          i = a.length;
          value += threshold;
          while (i--) {
            if (a[i] <= value) {
              return a[i];
            }
          }
        }
        return a[0];
      } : function (value, direction, threshold) {
        if (threshold === void 0) {
          threshold = 1e-3;
        }
        var snapped = snap(value);
        return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
      };
    },
    _getLabelAtDirection = function _getLabelAtDirection(timeline) {
      return function (value, st) {
        return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
      };
    },
    _multiListener = function _multiListener(func, element, types, callback) {
      return types.split(",").forEach(function (type) {
        return func(element, type, callback);
      });
    },
    _addListener$1 = function _addListener(element, type, func, nonPassive, capture) {
      return element.addEventListener(type, func, {
        passive: !nonPassive,
        capture: !!capture
      });
    },
    _removeListener$1 = function _removeListener(element, type, func, capture) {
      return element.removeEventListener(type, func, !!capture);
    },
    _wheelListener = function _wheelListener(func, el, scrollFunc) {
      return scrollFunc && scrollFunc.wheelHandler && func(el, "wheel", scrollFunc);
    },
    _markerDefaults = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    },
    _defaults = {
      toggleActions: "play",
      anticipatePin: 0
    },
    _keywords = {
      top: 0,
      left: 0,
      center: 0.5,
      bottom: 1,
      right: 1
    },
    _offsetToPx = function _offsetToPx(value, size) {
      if (_isString(value)) {
        var eqIndex = value.indexOf("="),
          relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
        if (~eqIndex) {
          value.indexOf("%") > eqIndex && (relative *= size / 100);
          value = value.substr(0, eqIndex - 1);
        }
        value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
      }
      return value;
    },
    _createMarker = function _createMarker(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
      var startColor = _ref4.startColor,
        endColor = _ref4.endColor,
        fontSize = _ref4.fontSize,
        indent = _ref4.indent,
        fontWeight = _ref4.fontWeight;
      var e = _doc$1.createElement("div"),
        useFixedPosition = _isViewport$1(container) || _getProxyProp(container, "pinType") === "fixed",
        isScroller = type.indexOf("scroller") !== -1,
        parent = useFixedPosition ? _body$1 : container,
        isStart = type.indexOf("start") !== -1,
        color = isStart ? startColor : endColor,
        css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
      (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
      matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
      e._isStart = isStart;
      e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
      e.style.cssText = css;
      e.innerText = name || name === 0 ? type + "-" + name : type;
      parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
      e._offset = e["offset" + direction.op.d2];
      _positionMarker(e, 0, direction, isStart);
      return e;
    },
    _positionMarker = function _positionMarker(marker, start, direction, flipped) {
      var vars = {
          display: "block"
        },
        side = direction[flipped ? "os2" : "p2"],
        oppositeSide = direction[flipped ? "p2" : "os2"];
      marker._isFlipped = flipped;
      vars[direction.a + "Percent"] = flipped ? -100 : 0;
      vars[direction.a] = flipped ? "1px" : 0;
      vars["border" + side + _Width] = 1;
      vars["border" + oppositeSide + _Width] = 0;
      vars[direction.p] = start + "px";
      gsap$1.set(marker, vars);
    },
    _triggers = [],
    _ids = {},
    _rafID,
    _sync = function _sync() {
      return _getTime$1() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
    },
    _onScroll$1 = function _onScroll() {
      if (!_normalizer$1 || !_normalizer$1.isPressed || _normalizer$1.startX > _body$1.clientWidth) {
        _scrollers.cache++;
        if (_normalizer$1) {
          _rafID || (_rafID = requestAnimationFrame(_updateAll));
        } else {
          _updateAll();
        }
        _lastScrollTime || _dispatch("scrollStart");
        _lastScrollTime = _getTime$1();
      }
    },
    _setBaseDimensions = function _setBaseDimensions() {
      _baseScreenWidth = _win$1.innerWidth;
      _baseScreenHeight = _win$1.innerHeight;
    },
    _onResize = function _onResize() {
      _scrollers.cache++;
      !_refreshing && !_ignoreResize && !_doc$1.fullscreenElement && !_doc$1.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win$1.innerWidth || Math.abs(_win$1.innerHeight - _baseScreenHeight) > _win$1.innerHeight * 0.25) && _resizeDelay.restart(true);
    },
    _listeners = {},
    _emptyArray = [],
    _softRefresh = function _softRefresh() {
      return _removeListener$1(ScrollTrigger$1, "scrollEnd", _softRefresh) || _refreshAll(true);
    },
    _dispatch = function _dispatch(type) {
      return _listeners[type] && _listeners[type].map(function (f) {
        return f();
      }) || _emptyArray;
    },
    _savedStyles = [],
    _revertRecorded = function _revertRecorded(media) {
      for (var i = 0; i < _savedStyles.length; i += 5) {
        if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
          _savedStyles[i].style.cssText = _savedStyles[i + 1];
          _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
          _savedStyles[i + 3].uncache = 1;
        }
      }
    },
    _revertAll = function _revertAll(kill, media) {
      var trigger;
      for (_i = 0; _i < _triggers.length; _i++) {
        trigger = _triggers[_i];
        if (trigger && (!media || trigger._ctx === media)) {
          if (kill) {
            trigger.kill(1);
          } else {
            trigger.revert(true, true);
          }
        }
      }
      media && _revertRecorded(media);
      media || _dispatch("revert");
    },
    _clearScrollMemory = function _clearScrollMemory(scrollRestoration, force) {
      _scrollers.cache++;
      (force || !_refreshingAll) && _scrollers.forEach(function (obj) {
        return _isFunction(obj) && obj.cacheID++ && (obj.rec = 0);
      });
      _isString(scrollRestoration) && (_win$1.history.scrollRestoration = _scrollRestoration = scrollRestoration);
    },
    _refreshingAll,
    _refreshID = 0,
    _queueRefreshID,
    _queueRefreshAll = function _queueRefreshAll() {
      if (_queueRefreshID !== _refreshID) {
        var id = _queueRefreshID = _refreshID;
        requestAnimationFrame(function () {
          return id === _refreshID && _refreshAll(true);
        });
      }
    },
    _refreshAll = function _refreshAll(force, skipRevert) {
      if (_lastScrollTime && !force) {
        _addListener$1(ScrollTrigger$1, "scrollEnd", _softRefresh);
        return;
      }
      _refreshingAll = ScrollTrigger$1.isRefreshing = true;
      _scrollers.forEach(function (obj) {
        return _isFunction(obj) && obj.cacheID++ && (obj.rec = obj());
      });
      var refreshInits = _dispatch("refreshInit");
      _sort && ScrollTrigger$1.sort();
      skipRevert || _revertAll();
      _scrollers.forEach(function (obj) {
        if (_isFunction(obj)) {
          obj.smooth && (obj.target.style.scrollBehavior = "auto");
          obj(0);
        }
      });
      _triggers.slice(0).forEach(function (t) {
        return t.refresh();
      });
      _triggers.forEach(function (t, i) {
        if (t._subPinOffset && t.pin) {
          var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
            original = t.pin[prop];
          t.revert(true, 1);
          t.adjustPinSpacing(t.pin[prop] - original);
          t.revert(false, 1);
        }
      });
      _triggers.forEach(function (t) {
        return t.vars.end === "max" && t.setPositions(t.start, Math.max(t.start + 1, _maxScroll(t.scroller, t._dir)));
      });
      refreshInits.forEach(function (result) {
        return result && result.render && result.render(-1);
      });
      _scrollers.forEach(function (obj) {
        if (_isFunction(obj)) {
          obj.smooth && requestAnimationFrame(function () {
            return obj.target.style.scrollBehavior = "smooth";
          });
          obj.rec && obj(obj.rec);
        }
      });
      _clearScrollMemory(_scrollRestoration, 1);
      _resizeDelay.pause();
      _refreshID++;
      _updateAll(2);
      _triggers.forEach(function (t) {
        return _isFunction(t.vars.onRefresh) && t.vars.onRefresh(t);
      });
      _refreshingAll = ScrollTrigger$1.isRefreshing = false;
      _dispatch("refresh");
    },
    _lastScroll = 0,
    _direction = 1,
    _primary,
    _updateAll = function _updateAll(force) {
      if (!_refreshingAll || force === 2) {
        ScrollTrigger$1.isUpdating = true;
        _primary && _primary.update(0);
        var l = _triggers.length,
          time = _getTime$1(),
          recordVelocity = time - _time1 >= 50,
          scroll = l && _triggers[0].scroll();
        _direction = _lastScroll > scroll ? -1 : 1;
        _lastScroll = scroll;
        if (recordVelocity) {
          if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
            _lastScrollTime = 0;
            _dispatch("scrollEnd");
          }
          _time2 = _time1;
          _time1 = time;
        }
        if (_direction < 0) {
          _i = l;
          while (_i-- > 0) {
            _triggers[_i] && _triggers[_i].update(0, recordVelocity);
          }
          _direction = 1;
        } else {
          for (_i = 0; _i < l; _i++) {
            _triggers[_i] && _triggers[_i].update(0, recordVelocity);
          }
        }
        ScrollTrigger$1.isUpdating = false;
      }
      _rafID = 0;
    },
    _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
    _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]),
    _swapPinOut = function _swapPinOut(pin, spacer, state) {
      _setState(state);
      var cache = pin._gsap;
      if (cache.spacerIsNative) {
        _setState(cache.spacerState);
      } else if (pin._gsap.swappedIn) {
        var parent = spacer.parentNode;
        if (parent) {
          parent.insertBefore(pin, spacer);
          parent.removeChild(spacer);
        }
      }
      pin._gsap.swappedIn = false;
    },
    _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
      if (!pin._gsap.swappedIn) {
        var i = _propNamesToCopy.length,
          spacerStyle = spacer.style,
          pinStyle = pin.style,
          p;
        while (i--) {
          p = _propNamesToCopy[i];
          spacerStyle[p] = cs[p];
        }
        spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
        cs.display === "inline" && (spacerStyle.display = "inline-block");
        pinStyle[_bottom] = pinStyle[_right] = "auto";
        spacerStyle.flexBasis = cs.flexBasis || "auto";
        spacerStyle.overflow = "visible";
        spacerStyle.boxSizing = "border-box";
        spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
        spacerStyle[_height] = _getSize(pin, _vertical) + _px;
        spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
        _setState(spacerState);
        pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
        pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
        pinStyle[_padding] = cs[_padding];
        if (pin.parentNode !== spacer) {
          pin.parentNode.insertBefore(spacer, pin);
          spacer.appendChild(pin);
        }
        pin._gsap.swappedIn = true;
      }
    },
    _capsExp = /([A-Z])/g,
    _setState = function _setState(state) {
      if (state) {
        var style = state.t.style,
          l = state.length,
          i = 0,
          p,
          value;
        (state.t._gsap || gsap$1.core.getCache(state.t)).uncache = 1;
        for (; i < l; i += 2) {
          value = state[i + 1];
          p = state[i];
          if (value) {
            style[p] = value;
          } else if (style[p]) {
            style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
          }
        }
      }
    },
    _getState = function _getState(element) {
      var l = _stateProps.length,
        style = element.style,
        state = [],
        i = 0;
      for (; i < l; i++) {
        state.push(_stateProps[i], style[_stateProps[i]]);
      }
      state.t = element;
      return state;
    },
    _copyState = function _copyState(state, override, omitOffsets) {
      var result = [],
        l = state.length,
        i = omitOffsets ? 8 : 0,
        p;
      for (; i < l; i += 2) {
        p = state[i];
        result.push(p, p in override ? override[p] : state[i + 1]);
      }
      result.t = state.t;
      return result;
    },
    _winOffsets = {
      left: 0,
      top: 0
    },
    _parsePosition = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation) {
      _isFunction(value) && (value = value(self));
      if (_isString(value) && value.substr(0, 3) === "max") {
        value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
      }
      var time = containerAnimation ? containerAnimation.time() : 0,
        p1,
        p2,
        element;
      containerAnimation && containerAnimation.seek(0);
      if (!_isNumber(value)) {
        _isFunction(trigger) && (trigger = trigger(self));
        var offsets = (value || "0").split(" "),
          bounds,
          localOffset,
          globalOffset,
          display;
        element = _getTarget(trigger) || _body$1;
        bounds = _getBounds(element) || {};
        if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
          display = element.style.display;
          element.style.display = "block";
          bounds = _getBounds(element);
          display ? element.style.display = display : element.style.removeProperty("display");
        }
        localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
        globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
        value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
        markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
        scrollerSize -= scrollerSize - globalOffset;
      } else if (markerScroller) {
        _positionMarker(markerScroller, scrollerSize, direction, true);
      }
      if (marker) {
        var position = value + scrollerSize,
          isStart = marker._isStart;
        p1 = "scroll" + direction.d2;
        _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body$1[p1], _docEl$1[p1]) : marker.parentNode[p1]) <= position + 1);
        if (useFixedPosition) {
          scrollerBounds = _getBounds(markerScroller);
          useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
        }
      }
      if (containerAnimation && element) {
        p1 = _getBounds(element);
        containerAnimation.seek(scrollerMax);
        p2 = _getBounds(element);
        containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
        value = value / containerAnimation._caScrollDist * scrollerMax;
      }
      containerAnimation && containerAnimation.seek(time);
      return containerAnimation ? value : Math.round(value);
    },
    _prefixExp = /(webkit|moz|length|cssText|inset)/i,
    _reparent = function _reparent(element, parent, top, left) {
      if (element.parentNode !== parent) {
        var style = element.style,
          p,
          cs;
        if (parent === _body$1) {
          element._stOrig = style.cssText;
          cs = _getComputedStyle(element);
          for (p in cs) {
            if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
              style[p] = cs[p];
            }
          }
          style.top = top;
          style.left = left;
        } else {
          style.cssText = element._stOrig;
        }
        gsap$1.core.getCache(element).uncache = 1;
        parent.appendChild(element);
      }
    },
    _getTweenCreator = function _getTweenCreator(scroller, direction) {
      var getScroll = _getScrollFunc(scroller, direction),
        prop = "_scroll" + direction.p2,
        lastScroll1,
        lastScroll2,
        getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
          var tween = getTween.tween,
            onComplete = vars.onComplete,
            modifiers = {};
          initialValue = initialValue || getScroll();
          change2 = change1 && change2 || 0;
          change1 = change1 || scrollTo - initialValue;
          tween && tween.kill();
          lastScroll1 = Math.round(initialValue);
          vars[prop] = scrollTo;
          vars.modifiers = modifiers;
          modifiers[prop] = function (value) {
            value = Math.round(getScroll());
            if (value !== lastScroll1 && value !== lastScroll2 && Math.abs(value - lastScroll1) > 3 && Math.abs(value - lastScroll2) > 3) {
              tween.kill();
              getTween.tween = 0;
            } else {
              value = initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio;
            }
            lastScroll2 = lastScroll1;
            return lastScroll1 = Math.round(value);
          };
          vars.onComplete = function () {
            getTween.tween = 0;
            onComplete && onComplete.call(tween);
          };
          tween = getTween.tween = gsap$1.to(scroller, vars);
          return tween;
        };
      scroller[prop] = getScroll;
      getScroll.wheelHandler = function () {
        return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
      };
      _addListener$1(scroller, "wheel", getScroll.wheelHandler);
      return getTween;
    };
  var ScrollTrigger$1 = function () {
    function ScrollTrigger(vars, animation) {
      _coreInitted$1 || ScrollTrigger.register(gsap$1) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
      this.init(vars, animation);
    }
    var _proto = ScrollTrigger.prototype;
    _proto.init = function init(vars, animation) {
      this.progress = this.start = 0;
      this.vars && this.kill(true, true);
      if (!_enabled) {
        this.update = this.refresh = this.kill = _passThrough;
        return;
      }
      vars = _setDefaults(_isString(vars) || _isNumber(vars) || vars.nodeType ? {
        trigger: vars
      } : vars, _defaults);
      var _vars = vars,
        onUpdate = _vars.onUpdate,
        toggleClass = _vars.toggleClass,
        id = _vars.id,
        onToggle = _vars.onToggle,
        onRefresh = _vars.onRefresh,
        scrub = _vars.scrub,
        trigger = _vars.trigger,
        pin = _vars.pin,
        pinSpacing = _vars.pinSpacing,
        invalidateOnRefresh = _vars.invalidateOnRefresh,
        anticipatePin = _vars.anticipatePin,
        onScrubComplete = _vars.onScrubComplete,
        onSnapComplete = _vars.onSnapComplete,
        once = _vars.once,
        snap = _vars.snap,
        pinReparent = _vars.pinReparent,
        pinSpacer = _vars.pinSpacer,
        containerAnimation = _vars.containerAnimation,
        fastScrollEnd = _vars.fastScrollEnd,
        preventOverlaps = _vars.preventOverlaps,
        direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical,
        isToggle = !scrub && scrub !== 0,
        scroller = _getTarget(vars.scroller || _win$1),
        scrollerCache = gsap$1.core.getCache(scroller),
        isViewport = _isViewport$1(scroller),
        useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed",
        callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack],
        toggleActions = isToggle && vars.toggleActions.split(" "),
        markers = "markers" in vars ? vars.markers : _defaults.markers,
        borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0,
        self = this,
        onRefreshInit = vars.onRefreshInit && function () {
          return vars.onRefreshInit(self);
        },
        getScrollerSize = _getSizeFunc(scroller, isViewport, direction),
        getScrollerOffsets = _getOffsetsFunc(scroller, isViewport),
        lastSnap = 0,
        lastRefresh = 0,
        scrollFunc = _getScrollFunc(scroller, direction),
        tweenTo,
        pinCache,
        snapFunc,
        scroll1,
        scroll2,
        start,
        end,
        markerStart,
        markerEnd,
        markerStartTrigger,
        markerEndTrigger,
        markerVars,
        change,
        pinOriginalState,
        pinActiveState,
        pinState,
        spacer,
        offset,
        pinGetter,
        pinSetter,
        pinStart,
        pinChange,
        spacingStart,
        spacerState,
        markerStartSetter,
        markerEndSetter,
        cs,
        snap1,
        snap2,
        scrubTween,
        scrubSmooth,
        snapDurClamp,
        snapDelayedCall,
        prevProgress,
        prevScroll,
        prevAnimProgress,
        caMarkerSetter,
        customRevertReturn;
      _context(self);
      self._dir = direction;
      anticipatePin *= 45;
      self.scroller = scroller;
      self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
      scroll1 = scrollFunc();
      self.vars = vars;
      animation = animation || vars.animation;
      if ("refreshPriority" in vars) {
        _sort = 1;
        vars.refreshPriority === -9999 && (_primary = self);
      }
      scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
        top: _getTweenCreator(scroller, _vertical),
        left: _getTweenCreator(scroller, _horizontal)
      };
      self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
      self.scrubDuration = function (value) {
        scrubSmooth = _isNumber(value) && value;
        if (!scrubSmooth) {
          scrubTween && scrubTween.progress(1).kill();
          scrubTween = 0;
        } else {
          scrubTween ? scrubTween.duration(value) : scrubTween = gsap$1.to(animation, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: scrubSmooth,
            paused: true,
            onComplete: function onComplete() {
              return onScrubComplete && onScrubComplete(self);
            }
          });
        }
      };
      if (animation) {
        animation.vars.lazy = false;
        animation._initted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
        self.animation = animation.pause();
        animation.scrollTrigger = self;
        self.scrubDuration(scrub);
        snap1 = 0;
        id || (id = animation.vars.id);
      }
      _triggers.push(self);
      if (snap) {
        if (!_isObject(snap) || snap.push) {
          snap = {
            snapTo: snap
          };
        }
        "scrollBehavior" in _body$1.style && gsap$1.set(isViewport ? [_body$1, _docEl$1] : scroller, {
          scrollBehavior: "auto"
        });
        _scrollers.forEach(function (o) {
          return _isFunction(o) && o.target === (isViewport ? _doc$1.scrollingElement || _docEl$1 : scroller) && (o.smooth = false);
        });
        snapFunc = _isFunction(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getClosestLabel(animation) : snap.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap.directional !== false ? function (value, st) {
          return _snapDirectional(snap.snapTo)(value, _getTime$1() - lastRefresh < 500 ? 0 : st.direction);
        } : gsap$1.utils.snap(snap.snapTo);
        snapDurClamp = snap.duration || {
          min: 0.1,
          max: 2
        };
        snapDurClamp = _isObject(snapDurClamp) ? _clamp$1(snapDurClamp.min, snapDurClamp.max) : _clamp$1(snapDurClamp, snapDurClamp);
        snapDelayedCall = gsap$1.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function () {
          var scroll = scrollFunc(),
            refreshedRecently = _getTime$1() - lastRefresh < 500,
            tween = tweenTo.tween;
          if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
            var progress = (scroll - start) / change,
              totalProgress = animation && !isToggle ? animation.totalProgress() : progress,
              velocity = refreshedRecently ? 0 : (totalProgress - snap2) / (_getTime$1() - _time2) * 1000 || 0,
              change1 = gsap$1.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185),
              naturalEnd = progress + (snap.inertia === false ? 0 : change1),
              endValue = _clamp$1(0, 1, snapFunc(naturalEnd, self)),
              endScroll = Math.round(start + endValue * change),
              _snap = snap,
              onStart = _snap.onStart,
              _onInterrupt = _snap.onInterrupt,
              _onComplete = _snap.onComplete;
            if (scroll <= end && scroll >= start && endScroll !== scroll) {
              if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
                return;
              }
              if (snap.inertia === false) {
                change1 = endValue - progress;
              }
              tweenTo(endScroll, {
                duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
                ease: snap.ease || "power3",
                data: _abs(endScroll - scroll),
                onInterrupt: function onInterrupt() {
                  return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
                },
                onComplete: function onComplete() {
                  self.update();
                  lastSnap = scrollFunc();
                  snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
                  onSnapComplete && onSnapComplete(self);
                  _onComplete && _onComplete(self);
                }
              }, scroll, change1 * change, endScroll - scroll - change1 * change);
              onStart && onStart(self, tweenTo.tween);
            }
          } else if (self.isActive && lastSnap !== scroll) {
            snapDelayedCall.restart(true);
          }
        }).pause();
      }
      id && (_ids[id] = self);
      trigger = self.trigger = _getTarget(trigger || pin);
      customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
      customRevertReturn && (customRevertReturn = customRevertReturn(self));
      pin = pin === true ? trigger : _getTarget(pin);
      _isString(toggleClass) && (toggleClass = {
        targets: trigger,
        className: toggleClass
      });
      if (pin) {
        pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
        self.pin = pin;
        pinCache = gsap$1.core.getCache(pin);
        if (!pinCache.spacer) {
          if (pinSpacer) {
            pinSpacer = _getTarget(pinSpacer);
            pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
            pinCache.spacerIsNative = !!pinSpacer;
            pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
          }
          pinCache.spacer = spacer = pinSpacer || _doc$1.createElement("div");
          spacer.classList.add("pin-spacer");
          id && spacer.classList.add("pin-spacer-" + id);
          pinCache.pinState = pinOriginalState = _getState(pin);
        } else {
          pinOriginalState = pinCache.pinState;
        }
        vars.force3D !== false && gsap$1.set(pin, {
          force3D: true
        });
        self.spacer = spacer = pinCache.spacer;
        cs = _getComputedStyle(pin);
        spacingStart = cs[pinSpacing + direction.os2];
        pinGetter = gsap$1.getProperty(pin);
        pinSetter = gsap$1.quickSetter(pin, direction.a, _px);
        _swapPinIn(pin, spacer, cs);
        pinState = _getState(pin);
      }
      if (markers) {
        markerVars = _isObject(markers) ? _setDefaults(markers, _markerDefaults) : _markerDefaults;
        markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
        markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
        offset = markerStartTrigger["offset" + direction.op.d2];
        var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
        markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
        markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
        containerAnimation && (caMarkerSetter = gsap$1.quickSetter([markerStart, markerEnd], direction.a, _px));
        if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
          _makePositionable(isViewport ? _body$1 : scroller);
          gsap$1.set([markerStartTrigger, markerEndTrigger], {
            force3D: true
          });
          markerStartSetter = gsap$1.quickSetter(markerStartTrigger, direction.a, _px);
          markerEndSetter = gsap$1.quickSetter(markerEndTrigger, direction.a, _px);
        }
      }
      if (containerAnimation) {
        var oldOnUpdate = containerAnimation.vars.onUpdate,
          oldParams = containerAnimation.vars.onUpdateParams;
        containerAnimation.eventCallback("onUpdate", function () {
          self.update(0, 0, 1);
          oldOnUpdate && oldOnUpdate.apply(oldParams || []);
        });
      }
      self.previous = function () {
        return _triggers[_triggers.indexOf(self) - 1];
      };
      self.next = function () {
        return _triggers[_triggers.indexOf(self) + 1];
      };
      self.revert = function (revert, temp) {
        if (!temp) {
          return self.kill(true);
        }
        var r = revert !== false || !self.enabled,
          prevRefreshing = _refreshing;
        if (r !== self.isReverted) {
          if (r) {
            prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
            prevProgress = self.progress;
            prevAnimProgress = animation && animation.progress();
          }
          markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
            return m.style.display = r ? "none" : "block";
          });
          if (r) {
            _refreshing = 1;
            self.update(r);
          }
          if (pin) {
            if (r) {
              _swapPinOut(pin, spacer, pinOriginalState);
            } else {
              (!pinReparent || !self.isActive) && _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
            }
          }
          r || self.update(r);
          _refreshing = prevRefreshing;
          self.isReverted = r;
        }
      };
      self.refresh = function (soft, force) {
        if ((_refreshing || !self.enabled) && !force) {
          return;
        }
        if (pin && soft && _lastScrollTime) {
          _addListener$1(ScrollTrigger, "scrollEnd", _softRefresh);
          return;
        }
        !_refreshingAll && onRefreshInit && onRefreshInit(self);
        _refreshing = 1;
        lastRefresh = _getTime$1();
        if (tweenTo.tween) {
          tweenTo.tween.kill();
          tweenTo.tween = 0;
        }
        scrubTween && scrubTween.pause();
        invalidateOnRefresh && animation && animation.revert({
          kill: false
        }).invalidate();
        self.isReverted || self.revert(true, true);
        self._subPinOffset = false;
        var size = getScrollerSize(),
          scrollerBounds = getScrollerOffsets(),
          max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction),
          offset = 0,
          otherPinOffset = 0,
          parsedEnd = vars.end,
          parsedEndTrigger = vars.endTrigger || trigger,
          parsedStart = vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"),
          pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer),
          triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0,
          i = triggerIndex,
          cs,
          bounds,
          scroll,
          isVertical,
          override,
          curTrigger,
          curPin,
          oppositeScroll,
          initted,
          revertedPins;
        while (i--) {
          curTrigger = _triggers[i];
          curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = 1);
          curPin = curTrigger.pin;
          if (curPin && (curPin === trigger || curPin === pin) && !curTrigger.isReverted) {
            revertedPins || (revertedPins = []);
            revertedPins.unshift(curTrigger);
            curTrigger.revert(true, true);
          }
          if (curTrigger !== _triggers[i]) {
            triggerIndex--;
            i--;
          }
        }
        _isFunction(parsedStart) && (parsedStart = parsedStart(self));
        start = _parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation) || (pin ? -0.001 : 0);
        _isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));
        if (_isString(parsedEnd) && !parsedEnd.indexOf("+=")) {
          if (~parsedEnd.indexOf(" ")) {
            parsedEnd = (_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
          } else {
            offset = _offsetToPx(parsedEnd.substr(2), size);
            parsedEnd = _isString(parsedStart) ? parsedStart : start + offset;
            parsedEndTrigger = trigger;
          }
        }
        end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation)) || -0.001;
        change = end - start || (start -= 0.01) && 0.001;
        offset = 0;
        i = triggerIndex;
        while (i--) {
          curTrigger = _triggers[i];
          curPin = curTrigger.pin;
          if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
            cs = curTrigger.end - curTrigger.start;
            if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && !_isNumber(parsedStart)) {
              offset += cs * (1 - curTrigger.progress);
            }
            curPin === pin && (otherPinOffset += cs);
          }
        }
        start += offset;
        end += offset;
        self._pinPush = otherPinOffset;
        if (markerStart && offset) {
          cs = {};
          cs[direction.a] = "+=" + offset;
          pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
          gsap$1.set([markerStart, markerEnd], cs);
        }
        if (pin) {
          cs = _getComputedStyle(pin);
          isVertical = direction === _vertical;
          scroll = scrollFunc();
          pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
          !max && end > 1 && ((isViewport ? _body$1 : scroller).style["overflow-" + direction.a] = "scroll");
          _swapPinIn(pin, spacer, cs);
          pinState = _getState(pin);
          bounds = _getBounds(pin, true);
          oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
          if (pinSpacing) {
            spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
            spacerState.t = spacer;
            i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
            i && spacerState.push(direction.d, i + _px);
            _setState(spacerState);
            if (pinnedContainer) {
              _triggers.forEach(function (t) {
                if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
                  t._subPinOffset = true;
                }
              });
            }
            useFixedPosition && scrollFunc(prevScroll);
          }
          if (useFixedPosition) {
            override = {
              top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
              left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
              boxSizing: "border-box",
              position: "fixed"
            };
            override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
            override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
            override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
            override[_padding] = cs[_padding];
            override[_padding + _Top] = cs[_padding + _Top];
            override[_padding + _Right] = cs[_padding + _Right];
            override[_padding + _Bottom] = cs[_padding + _Bottom];
            override[_padding + _Left] = cs[_padding + _Left];
            pinActiveState = _copyState(pinOriginalState, override, pinReparent);
            _refreshingAll && scrollFunc(0);
          }
          if (animation) {
            initted = animation._initted;
            _suppressOverwrites(1);
            animation.render(animation.duration(), true, true);
            pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
            change !== pinChange && useFixedPosition && pinActiveState.splice(pinActiveState.length - 2, 2);
            animation.render(0, true, true);
            initted || animation.invalidate(true);
            animation.parent || animation.totalTime(animation.totalTime());
            _suppressOverwrites(0);
          } else {
            pinChange = change;
          }
        } else if (trigger && scrollFunc() && !containerAnimation) {
          bounds = trigger.parentNode;
          while (bounds && bounds !== _body$1) {
            if (bounds._pinOffset) {
              start -= bounds._pinOffset;
              end -= bounds._pinOffset;
            }
            bounds = bounds.parentNode;
          }
        }
        revertedPins && revertedPins.forEach(function (t) {
          return t.revert(false, true);
        });
        self.start = start;
        self.end = end;
        scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
        if (!containerAnimation && !_refreshingAll) {
          scroll1 < prevScroll && scrollFunc(prevScroll);
          self.scroll.rec = 0;
        }
        self.revert(false, true);
        if (snapDelayedCall) {
          lastSnap = -1;
          self.isActive && scrollFunc(start + change * prevProgress);
          snapDelayedCall.restart(true);
        }
        _refreshing = 0;
        animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress, true).render(animation.time(), true, true);
        if (prevProgress !== self.progress || containerAnimation) {
          animation && !isToggle && animation.totalProgress(prevProgress, true);
          self.progress = (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
        }
        pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
        onRefresh && !_refreshingAll && onRefresh(self);
      };
      self.getVelocity = function () {
        return (scrollFunc() - scroll2) / (_getTime$1() - _time2) * 1000 || 0;
      };
      self.endAnimation = function () {
        _endAnimation(self.callbackAnimation);
        if (animation) {
          scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
        }
      };
      self.labelToScroll = function (label) {
        return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
      };
      self.getTrailing = function (name) {
        var i = _triggers.indexOf(self),
          a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
        return (_isString(name) ? a.filter(function (t) {
          return t.vars.preventOverlaps === name;
        }) : a).filter(function (t) {
          return self.direction > 0 ? t.end <= start : t.start >= end;
        });
      };
      self.update = function (reset, recordVelocity, forceFake) {
        if (containerAnimation && !forceFake && !reset) {
          return;
        }
        var scroll = _refreshingAll ? prevScroll : self.scroll(),
          p = reset ? 0 : (scroll - start) / change,
          clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0,
          prevProgress = self.progress,
          isActive,
          wasActive,
          toggleState,
          action,
          stateChanged,
          toggled,
          isAtMax,
          isTakingAction;
        if (recordVelocity) {
          scroll2 = scroll1;
          scroll1 = containerAnimation ? scrollFunc() : scroll;
          if (snap) {
            snap2 = snap1;
            snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
          }
        }
        anticipatePin && !clipped && pin && !_refreshing && !_startup$1 && _lastScrollTime && start < scroll + (scroll - scroll2) / (_getTime$1() - _time2) * anticipatePin && (clipped = 0.0001);
        if (clipped !== prevProgress && self.enabled) {
          isActive = self.isActive = !!clipped && clipped < 1;
          wasActive = !!prevProgress && prevProgress < 1;
          toggled = isActive !== wasActive;
          stateChanged = toggled || !!clipped !== !!prevProgress;
          self.direction = clipped > prevProgress ? 1 : -1;
          self.progress = clipped;
          if (stateChanged && !_refreshing) {
            toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3;
            if (isToggle) {
              action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
              isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
            }
          }
          preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function (t) {
            return t.endAnimation();
          }));
          if (!isToggle) {
            if (scrubTween && !_refreshing && !_startup$1) {
              (containerAnimation || _primary && _primary !== self) && scrubTween.render(scrubTween._dp._time - scrubTween._start);
              if (scrubTween.resetTo) {
                scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
              } else {
                scrubTween.vars.totalProgress = clipped;
                scrubTween.invalidate().restart();
              }
            } else if (animation) {
              animation.totalProgress(clipped, !!_refreshing);
            }
          }
          if (pin) {
            reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
            if (!useFixedPosition) {
              pinSetter(_round(pinStart + pinChange * clipped));
            } else if (stateChanged) {
              isAtMax = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
              if (pinReparent) {
                if (!reset && (isActive || isAtMax)) {
                  var bounds = _getBounds(pin, true),
                    _offset = scroll - start;
                  _reparent(pin, _body$1, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
                } else {
                  _reparent(pin, spacer);
                }
              }
              _setState(isActive || isAtMax ? pinActiveState : pinState);
              pinChange !== change && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
            }
          }
          snap && !tweenTo.tween && !_refreshing && !_startup$1 && snapDelayedCall.restart(true);
          toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function (el) {
            return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
          });
          onUpdate && !isToggle && !reset && onUpdate(self);
          if (stateChanged && !_refreshing) {
            if (isToggle) {
              if (isTakingAction) {
                if (action === "complete") {
                  animation.pause().totalProgress(1);
                } else if (action === "reset") {
                  animation.restart(true).pause();
                } else if (action === "restart") {
                  animation.restart(true);
                } else {
                  animation[action]();
                }
              }
              onUpdate && onUpdate(self);
            }
            if (toggled || !_limitCallbacks) {
              onToggle && toggled && _callback(self, onToggle);
              callbacks[toggleState] && _callback(self, callbacks[toggleState]);
              once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);
              if (!toggled) {
                toggleState = clipped === 1 ? 1 : 3;
                callbacks[toggleState] && _callback(self, callbacks[toggleState]);
              }
            }
            if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber(fastScrollEnd) ? fastScrollEnd : 2500)) {
              _endAnimation(self.callbackAnimation);
              scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
            }
          } else if (isToggle && onUpdate && !_refreshing) {
            onUpdate(self);
          }
        }
        if (markerEndSetter) {
          var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
          markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
          markerEndSetter(n);
        }
        caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
      };
      self.enable = function (reset, refresh) {
        if (!self.enabled) {
          self.enabled = true;
          _addListener$1(scroller, "resize", _onResize);
          _addListener$1(isViewport ? _doc$1 : scroller, "scroll", _onScroll$1);
          onRefreshInit && _addListener$1(ScrollTrigger, "refreshInit", onRefreshInit);
          if (reset !== false) {
            self.progress = prevProgress = 0;
            scroll1 = scroll2 = lastSnap = scrollFunc();
          }
          refresh !== false && self.refresh();
        }
      };
      self.getTween = function (snap) {
        return snap && tweenTo ? tweenTo.tween : scrubTween;
      };
      self.setPositions = function (newStart, newEnd) {
        if (pin) {
          pinStart += newStart - start;
          pinChange += newEnd - newStart - change;
          pinSpacing === _padding && self.adjustPinSpacing(newEnd - newStart - change);
        }
        self.start = start = newStart;
        self.end = end = newEnd;
        change = newEnd - newStart;
        self.update();
      };
      self.adjustPinSpacing = function (amount) {
        if (spacerState) {
          var i = spacerState.indexOf(direction.d) + 1;
          spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
          spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
          _setState(spacerState);
        }
      };
      self.disable = function (reset, allowAnimation) {
        if (self.enabled) {
          reset !== false && self.revert(true, true);
          self.enabled = self.isActive = false;
          allowAnimation || scrubTween && scrubTween.pause();
          prevScroll = 0;
          pinCache && (pinCache.uncache = 1);
          onRefreshInit && _removeListener$1(ScrollTrigger, "refreshInit", onRefreshInit);
          if (snapDelayedCall) {
            snapDelayedCall.pause();
            tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
          }
          if (!isViewport) {
            var i = _triggers.length;
            while (i--) {
              if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
                return;
              }
            }
            _removeListener$1(scroller, "resize", _onResize);
            _removeListener$1(scroller, "scroll", _onScroll$1);
          }
        }
      };
      self.kill = function (revert, allowAnimation) {
        self.disable(revert, allowAnimation);
        scrubTween && !allowAnimation && scrubTween.kill();
        id && delete _ids[id];
        var i = _triggers.indexOf(self);
        i >= 0 && _triggers.splice(i, 1);
        i === _i && _direction > 0 && _i--;
        i = 0;
        _triggers.forEach(function (t) {
          return t.scroller === self.scroller && (i = 1);
        });
        i || _refreshingAll || (self.scroll.rec = 0);
        if (animation) {
          animation.scrollTrigger = null;
          revert && animation.revert({
            kill: false
          });
          allowAnimation || animation.kill();
        }
        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
          return m.parentNode && m.parentNode.removeChild(m);
        });
        _primary === self && (_primary = 0);
        if (pin) {
          pinCache && (pinCache.uncache = 1);
          i = 0;
          _triggers.forEach(function (t) {
            return t.pin === pin && i++;
          });
          i || (pinCache.spacer = 0);
        }
        vars.onKill && vars.onKill(self);
      };
      self.enable(false, false);
      customRevertReturn && customRevertReturn(self);
      !animation || !animation.add || change ? self.refresh() : gsap$1.delayedCall(0.01, function () {
        return start || end || self.refresh();
      }) && (change = 0.01) && (start = end = 0);
      pin && _queueRefreshAll();
    };
    ScrollTrigger.register = function register(core) {
      if (!_coreInitted$1) {
        gsap$1 = core || _getGSAP$1();
        _windowExists() && window.document && ScrollTrigger.enable();
        _coreInitted$1 = _enabled;
      }
      return _coreInitted$1;
    };
    ScrollTrigger.defaults = function defaults(config) {
      if (config) {
        for (var p in config) {
          _defaults[p] = config[p];
        }
      }
      return _defaults;
    };
    ScrollTrigger.disable = function disable(reset, kill) {
      _enabled = 0;
      _triggers.forEach(function (trigger) {
        return trigger[kill ? "kill" : "disable"](reset);
      });
      _removeListener$1(_win$1, "wheel", _onScroll$1);
      _removeListener$1(_doc$1, "scroll", _onScroll$1);
      clearInterval(_syncInterval);
      _removeListener$1(_doc$1, "touchcancel", _passThrough);
      _removeListener$1(_body$1, "touchstart", _passThrough);
      _multiListener(_removeListener$1, _doc$1, "pointerdown,touchstart,mousedown", _pointerDownHandler);
      _multiListener(_removeListener$1, _doc$1, "pointerup,touchend,mouseup", _pointerUpHandler);
      _resizeDelay.kill();
      _iterateAutoRefresh(_removeListener$1);
      for (var i = 0; i < _scrollers.length; i += 3) {
        _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 1]);
        _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 2]);
      }
    };
    ScrollTrigger.enable = function enable() {
      _win$1 = window;
      _doc$1 = document;
      _docEl$1 = _doc$1.documentElement;
      _body$1 = _doc$1.body;
      if (gsap$1) {
        _toArray = gsap$1.utils.toArray;
        _clamp$1 = gsap$1.utils.clamp;
        _context = gsap$1.core.context || _passThrough;
        _suppressOverwrites = gsap$1.core.suppressOverwrites || _passThrough;
        _scrollRestoration = _win$1.history.scrollRestoration || "auto";
        gsap$1.core.globals("ScrollTrigger", ScrollTrigger);
        if (_body$1) {
          _enabled = 1;
          Observer.register(gsap$1);
          ScrollTrigger.isTouch = Observer.isTouch;
          _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
          _addListener$1(_win$1, "wheel", _onScroll$1);
          _root$1 = [_win$1, _doc$1, _docEl$1, _body$1];
          if (gsap$1.matchMedia) {
            ScrollTrigger.matchMedia = function (vars) {
              var mm = gsap$1.matchMedia(),
                p;
              for (p in vars) {
                mm.add(p, vars[p]);
              }
              return mm;
            };
            gsap$1.addEventListener("matchMediaInit", function () {
              return _revertAll();
            });
            gsap$1.addEventListener("matchMediaRevert", function () {
              return _revertRecorded();
            });
            gsap$1.addEventListener("matchMedia", function () {
              _refreshAll(0, 1);
              _dispatch("matchMedia");
            });
            gsap$1.matchMedia("(orientation: portrait)", function () {
              _setBaseDimensions();
              return _setBaseDimensions;
            });
          } else {
            console.warn("Requires GSAP 3.11.0 or later");
          }
          _setBaseDimensions();
          _addListener$1(_doc$1, "scroll", _onScroll$1);
          var bodyStyle = _body$1.style,
            border = bodyStyle.borderTopStyle,
            AnimationProto = gsap$1.core.Animation.prototype,
            bounds,
            i;
          AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
            value: function value() {
              return this.time(-0.01, true);
            }
          });
          bodyStyle.borderTopStyle = "solid";
          bounds = _getBounds(_body$1);
          _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
          _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
          border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
          _syncInterval = setInterval(_sync, 250);
          gsap$1.delayedCall(0.5, function () {
            return _startup$1 = 0;
          });
          _addListener$1(_doc$1, "touchcancel", _passThrough);
          _addListener$1(_body$1, "touchstart", _passThrough);
          _multiListener(_addListener$1, _doc$1, "pointerdown,touchstart,mousedown", _pointerDownHandler);
          _multiListener(_addListener$1, _doc$1, "pointerup,touchend,mouseup", _pointerUpHandler);
          _transformProp = gsap$1.utils.checkPrefix("transform");
          _stateProps.push(_transformProp);
          _coreInitted$1 = _getTime$1();
          _resizeDelay = gsap$1.delayedCall(0.2, _refreshAll).pause();
          _autoRefresh = [_doc$1, "visibilitychange", function () {
            var w = _win$1.innerWidth,
              h = _win$1.innerHeight;
            if (_doc$1.hidden) {
              _prevWidth = w;
              _prevHeight = h;
            } else if (_prevWidth !== w || _prevHeight !== h) {
              _onResize();
            }
          }, _doc$1, "DOMContentLoaded", _refreshAll, _win$1, "load", _refreshAll, _win$1, "resize", _onResize];
          _iterateAutoRefresh(_addListener$1);
          _triggers.forEach(function (trigger) {
            return trigger.enable(0, 1);
          });
          for (i = 0; i < _scrollers.length; i += 3) {
            _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 1]);
            _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 2]);
          }
        }
      }
    };
    ScrollTrigger.config = function config(vars) {
      "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
      var ms = vars.syncInterval;
      ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
      "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger.isTouch === 1 && vars.ignoreMobileResize);
      if ("autoRefreshEvents" in vars) {
        _iterateAutoRefresh(_removeListener$1) || _iterateAutoRefresh(_addListener$1, vars.autoRefreshEvents || "none");
        _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
      }
    };
    ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
      var t = _getTarget(target),
        i = _scrollers.indexOf(t),
        isViewport = _isViewport$1(t);
      if (~i) {
        _scrollers.splice(i, isViewport ? 6 : 2);
      }
      if (vars) {
        isViewport ? _proxies.unshift(_win$1, vars, _body$1, vars, _docEl$1, vars) : _proxies.unshift(t, vars);
      }
    };
    ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
      _triggers.forEach(function (t) {
        return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
      });
    };
    ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
      var bounds = (_isString(element) ? _getTarget(element) : element).getBoundingClientRect(),
        offset = bounds[horizontal ? _width : _height] * ratio || 0;
      return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win$1.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win$1.innerHeight;
    };
    ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
      _isString(element) && (element = _getTarget(element));
      var bounds = element.getBoundingClientRect(),
        size = bounds[horizontal ? _width : _height],
        offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
      return horizontal ? (bounds.left + offset) / _win$1.innerWidth : (bounds.top + offset) / _win$1.innerHeight;
    };
    ScrollTrigger.killAll = function killAll(allowListeners) {
      _triggers.forEach(function (t) {
        return t.vars.id !== "ScrollSmoother" && t.kill();
      });
      if (allowListeners !== true) {
        var listeners = _listeners.killAll || [];
        _listeners = {};
        listeners.forEach(function (f) {
          return f();
        });
      }
    };
    return ScrollTrigger;
  }();
  ScrollTrigger$1.version = "3.11.3";
  ScrollTrigger$1.saveStyles = function (targets) {
    return targets ? _toArray(targets).forEach(function (target) {
      if (target && target.style) {
        var i = _savedStyles.indexOf(target);
        i >= 0 && _savedStyles.splice(i, 5);
        _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap$1.core.getCache(target), _context());
      }
    }) : _savedStyles;
  };
  ScrollTrigger$1.revert = function (soft, media) {
    return _revertAll(!soft, media);
  };
  ScrollTrigger$1.create = function (vars, animation) {
    return new ScrollTrigger$1(vars, animation);
  };
  ScrollTrigger$1.refresh = function (safe) {
    return safe ? _onResize() : (_coreInitted$1 || ScrollTrigger$1.register()) && _refreshAll(true);
  };
  ScrollTrigger$1.update = _updateAll;
  ScrollTrigger$1.clearScrollMemory = _clearScrollMemory;
  ScrollTrigger$1.maxScroll = function (element, horizontal) {
    return _maxScroll(element, horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger$1.getScrollFunc = function (element, horizontal) {
    return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger$1.getById = function (id) {
    return _ids[id];
  };
  ScrollTrigger$1.getAll = function () {
    return _triggers.filter(function (t) {
      return t.vars.id !== "ScrollSmoother";
    });
  };
  ScrollTrigger$1.isScrolling = function () {
    return !!_lastScrollTime;
  };
  ScrollTrigger$1.snapDirectional = _snapDirectional;
  ScrollTrigger$1.addEventListener = function (type, callback) {
    var a = _listeners[type] || (_listeners[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  };
  ScrollTrigger$1.removeEventListener = function (type, callback) {
    var a = _listeners[type],
      i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  };
  ScrollTrigger$1.batch = function (targets, vars) {
    var result = [],
      varsCopy = {},
      interval = vars.interval || 0.016,
      batchMax = vars.batchMax || 1e9,
      proxyCallback = function proxyCallback(type, callback) {
        var elements = [],
          triggers = [],
          delay = gsap$1.delayedCall(interval, function () {
            callback(elements, triggers);
            elements = [];
            triggers = [];
          }).pause();
        return function (self) {
          elements.length || delay.restart(true);
          elements.push(self.trigger);
          triggers.push(self);
          batchMax <= elements.length && delay.progress(1);
        };
      },
      p;
    for (p in vars) {
      varsCopy[p] = p.substr(0, 2) === "on" && _isFunction(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
    }
    if (_isFunction(batchMax)) {
      batchMax = batchMax();
      _addListener$1(ScrollTrigger$1, "refresh", function () {
        return batchMax = vars.batchMax();
      });
    }
    _toArray(targets).forEach(function (target) {
      var config = {};
      for (p in varsCopy) {
        config[p] = varsCopy[p];
      }
      config.trigger = target;
      result.push(ScrollTrigger$1.create(config));
    });
    return result;
  };
  var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier(scrollFunc, current, end, max) {
      current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
      return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
    },
    _allowNativePanning = function _allowNativePanning(target, direction) {
      if (direction === true) {
        target.style.removeProperty("touch-action");
      } else {
        target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
      }
      target === _docEl$1 && _allowNativePanning(_body$1, direction);
    },
    _overflow = {
      auto: 1,
      scroll: 1
    },
    _nestedScroll = function _nestedScroll(_ref5) {
      var event = _ref5.event,
        target = _ref5.target,
        axis = _ref5.axis;
      var node = (event.changedTouches ? event.changedTouches[0] : event).target,
        cache = node._gsap || gsap$1.core.getCache(node),
        time = _getTime$1(),
        cs;
      if (!cache._isScrollT || time - cache._isScrollT > 2000) {
        while (node && node.scrollHeight <= node.clientHeight) {
          node = node.parentNode;
        }
        cache._isScroll = node && !_isViewport$1(node) && node !== target && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
        cache._isScrollT = time;
      }
      if (cache._isScroll || axis === "x") {
        event.stopPropagation();
        event._gsapAllow = true;
      }
    },
    _inputObserver = function _inputObserver(target, type, inputs, nested) {
      return Observer.create({
        target: target,
        capture: true,
        debounce: false,
        lockAxis: true,
        type: type,
        onWheel: nested = nested && _nestedScroll,
        onPress: nested,
        onDrag: nested,
        onScroll: nested,
        onEnable: function onEnable() {
          return inputs && _addListener$1(_doc$1, Observer.eventTypes[0], _captureInputs, false, true);
        },
        onDisable: function onDisable() {
          return _removeListener$1(_doc$1, Observer.eventTypes[0], _captureInputs, true);
        }
      });
    },
    _inputExp = /(input|label|select|textarea)/i,
    _inputIsFocused,
    _captureInputs = function _captureInputs(e) {
      var isInput = _inputExp.test(e.target.tagName);
      if (isInput || _inputIsFocused) {
        e._gsapAllow = true;
        _inputIsFocused = isInput;
      }
    },
    _getScrollNormalizer = function _getScrollNormalizer(vars) {
      _isObject(vars) || (vars = {});
      vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
      vars.type || (vars.type = "wheel,touch");
      vars.debounce = !!vars.debounce;
      vars.id = vars.id || "normalizer";
      var _vars2 = vars,
        normalizeScrollX = _vars2.normalizeScrollX,
        momentum = _vars2.momentum,
        allowNestedScroll = _vars2.allowNestedScroll,
        self,
        maxY,
        target = _getTarget(vars.target) || _docEl$1,
        smoother = gsap$1.core.globals().ScrollSmoother,
        smootherInstance = smoother && smoother.get(),
        content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()),
        scrollFuncY = _getScrollFunc(target, _vertical),
        scrollFuncX = _getScrollFunc(target, _horizontal),
        scale = 1,
        initialScale = (Observer.isTouch && _win$1.visualViewport ? _win$1.visualViewport.scale * _win$1.visualViewport.width : _win$1.outerWidth) / _win$1.innerWidth,
        wheelRefresh = 0,
        resolveMomentumDuration = _isFunction(momentum) ? function () {
          return momentum(self);
        } : function () {
          return momentum || 2.8;
        },
        lastRefreshID,
        skipTouchMove,
        inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll),
        resumeTouchMove = function resumeTouchMove() {
          return skipTouchMove = false;
        },
        scrollClampX = _passThrough,
        scrollClampY = _passThrough,
        updateClamps = function updateClamps() {
          maxY = _maxScroll(target, _vertical);
          scrollClampY = _clamp$1(_fixIOSBug ? 1 : 0, maxY);
          normalizeScrollX && (scrollClampX = _clamp$1(0, _maxScroll(target, _horizontal)));
          lastRefreshID = _refreshID;
        },
        removeContentOffset = function removeContentOffset() {
          content._gsap.y = _round(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
          content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
          scrollFuncY.offset = scrollFuncY.cacheID = 0;
        },
        ignoreDrag = function ignoreDrag() {
          if (skipTouchMove) {
            requestAnimationFrame(resumeTouchMove);
            var offset = _round(self.deltaY / 2),
              scroll = scrollClampY(scrollFuncY.v - offset);
            if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
              scrollFuncY.offset = scroll - scrollFuncY.v;
              var y = _round((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
              content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
              content._gsap.y = y + "px";
              scrollFuncY.cacheID = _scrollers.cache;
              _updateAll();
            }
            return true;
          }
          scrollFuncY.offset && removeContentOffset();
          skipTouchMove = true;
        },
        tween,
        startScrollX,
        startScrollY,
        onStopDelayedCall,
        onResize = function onResize() {
          updateClamps();
          if (tween.isActive() && tween.vars.scrollY > maxY) {
            scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
          }
        };
      content && gsap$1.set(content, {
        y: "+=0"
      });
      vars.ignoreCheck = function (e) {
        return _fixIOSBug && e.type === "touchmove" && ignoreDrag() || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
      };
      vars.onPress = function () {
        var prevScale = scale;
        scale = _round((_win$1.visualViewport && _win$1.visualViewport.scale || 1) / initialScale);
        tween.pause();
        prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
        startScrollX = scrollFuncX();
        startScrollY = scrollFuncY();
        updateClamps();
        lastRefreshID = _refreshID;
      };
      vars.onRelease = vars.onGestureStart = function (self, wasDragging) {
        scrollFuncY.offset && removeContentOffset();
        if (!wasDragging) {
          onStopDelayedCall.restart(true);
        } else {
          _scrollers.cache++;
          var dur = resolveMomentumDuration(),
            currentScroll,
            endScroll;
          if (normalizeScrollX) {
            currentScroll = scrollFuncX();
            endScroll = currentScroll + dur * 0.05 * -self.velocityX / 0.227;
            dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
            tween.vars.scrollX = scrollClampX(endScroll);
          }
          currentScroll = scrollFuncY();
          endScroll = currentScroll + dur * 0.05 * -self.velocityY / 0.227;
          dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
          tween.vars.scrollY = scrollClampY(endScroll);
          tween.invalidate().duration(dur).play(0.01);
          if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
            gsap$1.to({}, {
              onUpdate: onResize,
              duration: dur
            });
          }
        }
      };
      vars.onWheel = function () {
        tween._ts && tween.pause();
        if (_getTime$1() - wheelRefresh > 1000) {
          lastRefreshID = 0;
          wheelRefresh = _getTime$1();
        }
      };
      vars.onChange = function (self, dx, dy, xArray, yArray) {
        _refreshID !== lastRefreshID && updateClamps();
        dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self.startX - self.x) : scrollFuncX() + dx - xArray[1]));
        if (dy) {
          scrollFuncY.offset && removeContentOffset();
          var isTouch = yArray[2] === dy,
            y = isTouch ? startScrollY + self.startY - self.y : scrollFuncY() + dy - yArray[1],
            yClamped = scrollClampY(y);
          isTouch && y !== yClamped && (startScrollY += yClamped - y);
          scrollFuncY(yClamped);
        }
        (dy || dx) && _updateAll();
      };
      vars.onEnable = function () {
        _allowNativePanning(target, normalizeScrollX ? false : "x");
        ScrollTrigger$1.addEventListener("refresh", onResize);
        _addListener$1(_win$1, "resize", onResize);
        if (scrollFuncY.smooth) {
          scrollFuncY.target.style.scrollBehavior = "auto";
          scrollFuncY.smooth = scrollFuncX.smooth = false;
        }
        inputObserver.enable();
      };
      vars.onDisable = function () {
        _allowNativePanning(target, true);
        _removeListener$1(_win$1, "resize", onResize);
        ScrollTrigger$1.removeEventListener("refresh", onResize);
        inputObserver.kill();
      };
      vars.lockAxis = vars.lockAxis !== false;
      self = new Observer(vars);
      self.iOS = _fixIOSBug;
      _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
      _fixIOSBug && gsap$1.ticker.add(_passThrough);
      onStopDelayedCall = self._dc;
      tween = gsap$1.to(self, {
        ease: "power4",
        paused: true,
        scrollX: normalizeScrollX ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        onComplete: onStopDelayedCall.vars.onComplete
      });
      return self;
    };
  ScrollTrigger$1.sort = function (func) {
    return _triggers.sort(func || function (a, b) {
      return (a.vars.refreshPriority || 0) * -1e6 + a.start - (b.start + (b.vars.refreshPriority || 0) * -1e6);
    });
  };
  ScrollTrigger$1.observe = function (vars) {
    return new Observer(vars);
  };
  ScrollTrigger$1.normalizeScroll = function (vars) {
    if (typeof vars === "undefined") {
      return _normalizer$1;
    }
    if (vars === true && _normalizer$1) {
      return _normalizer$1.enable();
    }
    if (vars === false) {
      return _normalizer$1 && _normalizer$1.kill();
    }
    var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
    _normalizer$1 && _normalizer$1.target === normalizer.target && _normalizer$1.kill();
    _isViewport$1(normalizer.target) && (_normalizer$1 = normalizer);
    return normalizer;
  };
  ScrollTrigger$1.core = {
    _getVelocityProp: _getVelocityProp,
    _inputObserver: _inputObserver,
    _scrollers: _scrollers,
    _proxies: _proxies,
    bridge: {
      ss: function ss() {
        _lastScrollTime || _dispatch("scrollStart");
        _lastScrollTime = _getTime$1();
      },
      ref: function ref() {
        return _refreshing;
      }
    }
  };
  _getGSAP$1() && gsap$1.registerPlugin(ScrollTrigger$1);
  exports.ScrollTrigger = ScrollTrigger$1;
  exports.default = ScrollTrigger$1;
  if (typeof window === 'undefined' || window !== exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  } else {
    delete window.default;
  }
});

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function (window, factory) {
  'use strict';

  // universal module definition

  /*global define: false, module: false, require: false */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(862)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (EvEmitter) {
      return factory(window, EvEmitter);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(typeof window !== 'undefined' ? window : this,
// --------------------------  factory -------------------------- //

function factory(window, EvEmitter) {
  'use strict';

  var $ = window.jQuery;
  var console = window.console;

  // -------------------------- helpers -------------------------- //

  // extend objects
  function extend(a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }
    return a;
  }
  var arraySlice = Array.prototype.slice;

  // turn element or nodeList into an array
  function makeArray(obj) {
    if (Array.isArray(obj)) {
      // use object if already an array
      return obj;
    }
    var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
    if (isArrayLike) {
      // convert nodeList to array
      return arraySlice.call(obj);
    }

    // array of single index
    return [obj];
  }

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded(elem, options, onAlways) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if (!(this instanceof ImagesLoaded)) {
      return new ImagesLoaded(elem, options, onAlways);
    }
    // use elem as selector string
    var queryElem = elem;
    if (typeof elem == 'string') {
      queryElem = document.querySelectorAll(elem);
    }
    // bail if bad element
    if (!queryElem) {
      console.error('Bad element for imagesLoaded ' + (queryElem || elem));
      return;
    }
    this.elements = makeArray(queryElem);
    this.options = extend({}, this.options);
    // shift arguments if no options set
    if (typeof options == 'function') {
      onAlways = options;
    } else {
      extend(this.options, options);
    }
    if (onAlways) {
      this.on('always', onAlways);
    }
    this.getImages();
    if ($) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    setTimeout(this.check.bind(this));
  }
  ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
  ImagesLoaded.prototype.options = {};
  ImagesLoaded.prototype.getImages = function () {
    this.images = [];

    // filter & find items if we have an item selector
    this.elements.forEach(this.addElementImages, this);
  };

  /**
   * @param {Node} element
   */
  ImagesLoaded.prototype.addElementImages = function (elem) {
    // filter siblings
    if (elem.nodeName == 'IMG') {
      this.addImage(elem);
    }
    // get background image on element
    if (this.options.background === true) {
      this.addElementBackgroundImages(elem);
    }

    // find children
    // no non-element nodes, #143
    var nodeType = elem.nodeType;
    if (!nodeType || !elementNodeTypes[nodeType]) {
      return;
    }
    var childImgs = elem.querySelectorAll('img');
    // concat childElems to filterFound array
    for (var i = 0; i < childImgs.length; i++) {
      var img = childImgs[i];
      this.addImage(img);
    }

    // get child background images
    if (typeof this.options.background == 'string') {
      var children = elem.querySelectorAll(this.options.background);
      for (i = 0; i < children.length; i++) {
        var child = children[i];
        this.addElementBackgroundImages(child);
      }
    }
  };
  var elementNodeTypes = {
    1: true,
    9: true,
    11: true
  };
  ImagesLoaded.prototype.addElementBackgroundImages = function (elem) {
    var style = getComputedStyle(elem);
    if (!style) {
      // Firefox returns null if in a hidden iframe https://bugzil.la/548397
      return;
    }
    // get url inside url("...")
    var reURL = /url\((['"])?(.*?)\1\)/gi;
    var matches = reURL.exec(style.backgroundImage);
    while (matches !== null) {
      var url = matches && matches[2];
      if (url) {
        this.addBackground(url, elem);
      }
      matches = reURL.exec(style.backgroundImage);
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function (img) {
    var loadingImage = new LoadingImage(img);
    this.images.push(loadingImage);
  };
  ImagesLoaded.prototype.addBackground = function (url, elem) {
    var background = new Background(url, elem);
    this.images.push(background);
  };
  ImagesLoaded.prototype.check = function () {
    var _this = this;
    this.progressedCount = 0;
    this.hasAnyBroken = false;
    // complete if no images
    if (!this.images.length) {
      this.complete();
      return;
    }
    function onProgress(image, elem, message) {
      // HACK - Chrome triggers event before object properties have changed. #83
      setTimeout(function () {
        _this.progress(image, elem, message);
      });
    }
    this.images.forEach(function (loadingImage) {
      loadingImage.once('progress', onProgress);
      loadingImage.check();
    });
  };
  ImagesLoaded.prototype.progress = function (image, elem, message) {
    this.progressedCount++;
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // progress event
    this.emitEvent('progress', [this, image, elem]);
    if (this.jqDeferred && this.jqDeferred.notify) {
      this.jqDeferred.notify(this, image);
    }
    // check if completed
    if (this.progressedCount == this.images.length) {
      this.complete();
    }
    if (this.options.debug && console) {
      console.log('progress: ' + message, image, elem);
    }
  };
  ImagesLoaded.prototype.complete = function () {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    this.emitEvent(eventName, [this]);
    this.emitEvent('always', [this]);
    if (this.jqDeferred) {
      var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
      this.jqDeferred[jqMethod](this);
    }
  };

  // --------------------------  -------------------------- //

  function LoadingImage(img) {
    this.img = img;
  }
  LoadingImage.prototype = Object.create(EvEmitter.prototype);
  LoadingImage.prototype.check = function () {
    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    var isComplete = this.getIsImageComplete();
    if (isComplete) {
      // report based on naturalWidth
      this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    this.proxyImage = new Image();
    this.proxyImage.addEventListener('load', this);
    this.proxyImage.addEventListener('error', this);
    // bind to image as well for Firefox. #191
    this.img.addEventListener('load', this);
    this.img.addEventListener('error', this);
    this.proxyImage.src = this.img.src;
  };
  LoadingImage.prototype.getIsImageComplete = function () {
    // check for non-zero, non-undefined naturalWidth
    // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
    return this.img.complete && this.img.naturalWidth;
  };
  LoadingImage.prototype.confirm = function (isLoaded, message) {
    this.isLoaded = isLoaded;
    this.emitEvent('progress', [this, this.img, message]);
  };

  // ----- events ----- //

  // trigger specified handler for event type
  LoadingImage.prototype.handleEvent = function (event) {
    var method = 'on' + event.type;
    if (this[method]) {
      this[method](event);
    }
  };
  LoadingImage.prototype.onload = function () {
    this.confirm(true, 'onload');
    this.unbindEvents();
  };
  LoadingImage.prototype.onerror = function () {
    this.confirm(false, 'onerror');
    this.unbindEvents();
  };
  LoadingImage.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener('load', this);
    this.proxyImage.removeEventListener('error', this);
    this.img.removeEventListener('load', this);
    this.img.removeEventListener('error', this);
  };

  // -------------------------- Background -------------------------- //

  function Background(url, element) {
    this.url = url;
    this.element = element;
    this.img = new Image();
  }

  // inherit LoadingImage prototype
  Background.prototype = Object.create(LoadingImage.prototype);
  Background.prototype.check = function () {
    this.img.addEventListener('load', this);
    this.img.addEventListener('error', this);
    this.img.src = this.url;
    // check if image is already complete
    var isComplete = this.getIsImageComplete();
    if (isComplete) {
      this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
      this.unbindEvents();
    }
  };
  Background.prototype.unbindEvents = function () {
    this.img.removeEventListener('load', this);
    this.img.removeEventListener('error', this);
  };
  Background.prototype.confirm = function (isLoaded, message) {
    this.isLoaded = isLoaded;
    this.emitEvent('progress', [this, this.element, message]);
  };

  // -------------------------- jQuery -------------------------- //

  ImagesLoaded.makeJQueryPlugin = function (jQuery) {
    jQuery = jQuery || window.jQuery;
    if (!jQuery) {
      return;
    }
    // set local variable
    $ = jQuery;
    // $().imagesLoaded()
    $.fn.imagesLoaded = function (options, callback) {
      var instance = new ImagesLoaded(this, options, callback);
      return instance.jqDeferred.promise($(this));
    };
  };
  // try making plugin
  ImagesLoaded.makeJQueryPlugin();

  // --------------------------  -------------------------- //

  return ImagesLoaded;
});

/***/ }),

/***/ 138:
/***/ (function(module) {

/*!
 * in-view 0.6.1 - Get notified when a DOM element enters or exits the viewport.
 * Copyright (c) 2016 Cam Wiegert <cam@camwiegert.com> - https://camwiegert.github.io/in-view
 * License: MIT
 */
!function (t, e) {
   true ? module.exports = e() : 0;
}(this, function () {
  return function (t) {
    function e(r) {
      if (n[r]) return n[r].exports;
      var i = n[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0);
  }([function (t, e, n) {
    "use strict";

    function r(t) {
      return t && t.__esModule ? t : {
        "default": t
      };
    }
    var i = n(2),
      o = r(i);
    t.exports = o["default"];
  }, function (t, e) {
    function n(t) {
      var e = typeof t;
      return null != t && ("object" == e || "function" == e);
    }
    t.exports = n;
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      return t && t.__esModule ? t : {
        "default": t
      };
    }
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var i = n(9),
      o = r(i),
      u = n(3),
      f = r(u),
      s = n(4),
      c = function () {
        if ("undefined" != typeof window) {
          var t = 100,
            e = ["scroll", "resize", "load"],
            n = {
              history: []
            },
            r = {
              offset: {},
              threshold: 0,
              test: s.inViewport
            },
            i = (0, o["default"])(function () {
              n.history.forEach(function (t) {
                n[t].check();
              });
            }, t);
          e.forEach(function (t) {
            return addEventListener(t, i);
          }), window.MutationObserver && addEventListener("DOMContentLoaded", function () {
            new MutationObserver(i).observe(document.body, {
              attributes: !0,
              childList: !0,
              subtree: !0
            });
          });
          var u = function (t) {
            if ("string" == typeof t) {
              var e = [].slice.call(document.querySelectorAll(t));
              return n.history.indexOf(t) > -1 ? n[t].elements = e : (n[t] = (0, f["default"])(e, r), n.history.push(t)), n[t];
            }
          };
          return u.offset = function (t) {
            if (void 0 === t) return r.offset;
            var e = function (t) {
              return "number" == typeof t;
            };
            return ["top", "right", "bottom", "left"].forEach(e(t) ? function (e) {
              return r.offset[e] = t;
            } : function (n) {
              return e(t[n]) ? r.offset[n] = t[n] : null;
            }), r.offset;
          }, u.threshold = function (t) {
            return "number" == typeof t && t >= 0 && t <= 1 ? r.threshold = t : r.threshold;
          }, u.test = function (t) {
            return "function" == typeof t ? r.test = t : r.test;
          }, u.is = function (t) {
            return r.test(t, r);
          }, u.offset(0), u;
        }
      };
    e["default"] = c();
  }, function (t, e) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var r = function () {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
          }
        }
        return function (e, n, r) {
          return n && t(e.prototype, n), r && t(e, r), e;
        };
      }(),
      i = function () {
        function t(e, r) {
          n(this, t), this.options = r, this.elements = e, this.current = [], this.handlers = {
            enter: [],
            exit: []
          }, this.singles = {
            enter: [],
            exit: []
          };
        }
        return r(t, [{
          key: "check",
          value: function () {
            var t = this;
            return this.elements.forEach(function (e) {
              var n = t.options.test(e, t.options),
                r = t.current.indexOf(e),
                i = r > -1,
                o = n && !i,
                u = !n && i;
              o && (t.current.push(e), t.emit("enter", e)), u && (t.current.splice(r, 1), t.emit("exit", e));
            }), this;
          }
        }, {
          key: "on",
          value: function (t, e) {
            return this.handlers[t].push(e), this;
          }
        }, {
          key: "once",
          value: function (t, e) {
            return this.singles[t].unshift(e), this;
          }
        }, {
          key: "emit",
          value: function (t, e) {
            for (; this.singles[t].length;) this.singles[t].pop()(e);
            for (var n = this.handlers[t].length; --n > -1;) this.handlers[t][n](e);
            return this;
          }
        }]), t;
      }();
    e["default"] = function (t, e) {
      return new i(t, e);
    };
  }, function (t, e) {
    "use strict";

    function n(t, e) {
      var n = t.getBoundingClientRect(),
        r = n.top,
        i = n.right,
        o = n.bottom,
        u = n.left,
        f = n.width,
        s = n.height,
        c = {
          t: o,
          r: window.innerWidth - u,
          b: window.innerHeight - r,
          l: i
        },
        a = {
          x: e.threshold * f,
          y: e.threshold * s
        };
      return c.t > e.offset.top + a.y && c.r > e.offset.right + a.x && c.b > e.offset.bottom + a.y && c.l > e.offset.left + a.x;
    }
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.inViewport = n;
  }, function (t, e) {
    (function (e) {
      var n = "object" == typeof e && e && e.Object === Object && e;
      t.exports = n;
    }).call(e, function () {
      return this;
    }());
  }, function (t, e, n) {
    var r = n(5),
      i = "object" == typeof self && self && self.Object === Object && self,
      o = r || i || Function("return this")();
    t.exports = o;
  }, function (t, e, n) {
    function r(t, e, n) {
      function r(e) {
        var n = x,
          r = m;
        return x = m = void 0, E = e, w = t.apply(r, n);
      }
      function a(t) {
        return E = t, j = setTimeout(h, e), M ? r(t) : w;
      }
      function l(t) {
        var n = t - O,
          r = t - E,
          i = e - n;
        return _ ? c(i, g - r) : i;
      }
      function d(t) {
        var n = t - O,
          r = t - E;
        return void 0 === O || n >= e || n < 0 || _ && r >= g;
      }
      function h() {
        var t = o();
        return d(t) ? p(t) : void (j = setTimeout(h, l(t)));
      }
      function p(t) {
        return j = void 0, T && x ? r(t) : (x = m = void 0, w);
      }
      function v() {
        void 0 !== j && clearTimeout(j), E = 0, x = O = m = j = void 0;
      }
      function y() {
        return void 0 === j ? w : p(o());
      }
      function b() {
        var t = o(),
          n = d(t);
        if (x = arguments, m = this, O = t, n) {
          if (void 0 === j) return a(O);
          if (_) return j = setTimeout(h, e), r(O);
        }
        return void 0 === j && (j = setTimeout(h, e)), w;
      }
      var x,
        m,
        g,
        w,
        j,
        O,
        E = 0,
        M = !1,
        _ = !1,
        T = !0;
      if ("function" != typeof t) throw new TypeError(f);
      return e = u(e) || 0, i(n) && (M = !!n.leading, _ = "maxWait" in n, g = _ ? s(u(n.maxWait) || 0, e) : g, T = "trailing" in n ? !!n.trailing : T), b.cancel = v, b.flush = y, b;
    }
    var i = n(1),
      o = n(8),
      u = n(10),
      f = "Expected a function",
      s = Math.max,
      c = Math.min;
    t.exports = r;
  }, function (t, e, n) {
    var r = n(6),
      i = function () {
        return r.Date.now();
      };
    t.exports = i;
  }, function (t, e, n) {
    function r(t, e, n) {
      var r = !0,
        f = !0;
      if ("function" != typeof t) throw new TypeError(u);
      return o(n) && (r = "leading" in n ? !!n.leading : r, f = "trailing" in n ? !!n.trailing : f), i(t, e, {
        leading: r,
        maxWait: e,
        trailing: f
      });
    }
    var i = n(7),
      o = n(1),
      u = "Expected a function";
    t.exports = r;
  }, function (t, e) {
    function n(t) {
      return t;
    }
    t.exports = n;
  }]);
});

/***/ }),

/***/ 180:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"object" == typeof navigator && function (e, t) {
   true ? module.exports = t() : 0;
}(this, function () {
  "use strict";

  function e(e, t, i) {
    return (t = function (e) {
      var t = function (e, t) {
        if ("object" != typeof e || null === e) return e;
        var i = e[Symbol.toPrimitive];
        if (void 0 !== i) {
          var s = i.call(e, t || "default");
          if ("object" != typeof s) return s;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      }(e, "string");
      return "symbol" == typeof t ? t : String(t);
    }(t)) in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }
  function t(e, t) {
    for (var i = 0; i < t.length; i++) {
      var s = t[i];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
    }
  }
  function i(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }
  function s(e, t) {
    var i = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      t && (s = s.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, s);
    }
    return i;
  }
  function n(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? s(Object(n), !0).forEach(function (t) {
        i(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var a = {
    addCSS: !0,
    thumbWidth: 15,
    watch: !0
  };
  var l = function (e) {
      return null != e ? e.constructor : null;
    },
    r = function (e, t) {
      return !!(e && t && e instanceof t);
    },
    o = function (e) {
      return null == e;
    },
    c = function (e) {
      return l(e) === Object;
    },
    u = function (e) {
      return l(e) === String;
    },
    h = function (e) {
      return Array.isArray(e);
    },
    d = function (e) {
      return r(e, NodeList);
    },
    m = {
      nullOrUndefined: o,
      object: c,
      number: function (e) {
        return l(e) === Number && !Number.isNaN(e);
      },
      string: u,
      boolean: function (e) {
        return l(e) === Boolean;
      },
      function: function (e) {
        return l(e) === Function;
      },
      array: h,
      nodeList: d,
      element: function (e) {
        return r(e, Element);
      },
      event: function (e) {
        return r(e, Event);
      },
      empty: function (e) {
        return o(e) || (u(e) || h(e) || d(e)) && !e.length || c(e) && !Object.keys(e).length;
      }
    };
  function p(e, t) {
    if (1 > t) {
      var i = function (e) {
        var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
      }(t);
      return parseFloat(e.toFixed(i));
    }
    return Math.round(e / t) * t;
  }
  var g = function () {
    function e(t, i) {
      (function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      })(this, e), m.element(t) ? this.element = t : m.string(t) && (this.element = document.querySelector(t)), m.element(this.element) && m.empty(this.element.rangeTouch) && (this.config = n({}, a, {}, i), this.init());
    }
    return function (e, i, s) {
      i && t(e.prototype, i), s && t(e, s);
    }(e, [{
      key: "init",
      value: function () {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
      }
    }, {
      key: "destroy",
      value: function () {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null);
      }
    }, {
      key: "listeners",
      value: function (e) {
        var t = this,
          i = e ? "addEventListener" : "removeEventListener";
        ["touchstart", "touchmove", "touchend"].forEach(function (e) {
          t.element[i](e, function (e) {
            return t.set(e);
          }, !1);
        });
      }
    }, {
      key: "get",
      value: function (t) {
        if (!e.enabled || !m.event(t)) return null;
        var i,
          s = t.target,
          n = t.changedTouches[0],
          a = parseFloat(s.getAttribute("min")) || 0,
          l = parseFloat(s.getAttribute("max")) || 100,
          r = parseFloat(s.getAttribute("step")) || 1,
          o = s.getBoundingClientRect(),
          c = 100 / o.width * (this.config.thumbWidth / 2) / 100;
        return 0 > (i = 100 / o.width * (n.clientX - o.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), a + p(i / 100 * (l - a), r);
      }
    }, {
      key: "set",
      value: function (t) {
        e.enabled && m.event(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function (e, t) {
          if (e && t) {
            var i = new Event(t, {
              bubbles: !0
            });
            e.dispatchEvent(i);
          }
        }(t.target, "touchend" === t.type ? "change" : "input"));
      }
    }], [{
      key: "setup",
      value: function (t) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          s = null;
        if (m.empty(t) || m.string(t) ? s = Array.from(document.querySelectorAll(m.string(t) ? t : 'input[type="range"]')) : m.element(t) ? s = [t] : m.nodeList(t) ? s = Array.from(t) : m.array(t) && (s = t.filter(m.element)), m.empty(s)) return null;
        var l = n({}, a, {}, i);
        if (m.string(t) && l.watch) {
          var r = new MutationObserver(function (i) {
            Array.from(i).forEach(function (i) {
              Array.from(i.addedNodes).forEach(function (i) {
                m.element(i) && function (e, t) {
                  return function () {
                    return Array.from(document.querySelectorAll(t)).includes(this);
                  }.call(e, t);
                }(i, t) && new e(i, l);
              });
            });
          });
          r.observe(document.body, {
            childList: !0,
            subtree: !0
          });
        }
        return s.map(function (t) {
          return new e(t, i);
        });
      }
    }, {
      key: "enabled",
      get: function () {
        return "ontouchstart" in document.documentElement;
      }
    }]), e;
  }();
  const f = e => null != e ? e.constructor : null,
    y = (e, t) => Boolean(e && t && e instanceof t),
    b = e => null == e,
    v = e => f(e) === Object,
    w = e => f(e) === String,
    T = e => "function" == typeof e,
    k = e => Array.isArray(e),
    C = e => y(e, NodeList),
    A = e => b(e) || (w(e) || k(e) || C(e)) && !e.length || v(e) && !Object.keys(e).length;
  var S = {
    nullOrUndefined: b,
    object: v,
    number: e => f(e) === Number && !Number.isNaN(e),
    string: w,
    boolean: e => f(e) === Boolean,
    function: T,
    array: k,
    weakMap: e => y(e, WeakMap),
    nodeList: C,
    element: e => null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument,
    textNode: e => f(e) === Text,
    event: e => y(e, Event),
    keyboardEvent: e => y(e, KeyboardEvent),
    cue: e => y(e, window.TextTrackCue) || y(e, window.VTTCue),
    track: e => y(e, TextTrack) || !b(e) && w(e.kind),
    promise: e => y(e, Promise) && T(e.then),
    url: e => {
      if (y(e, window.URL)) return !0;
      if (!w(e)) return !1;
      let t = e;
      e.startsWith("http://") && e.startsWith("https://") || (t = `http://${e}`);
      try {
        return !A(new URL(t).hostname);
      } catch (e) {
        return !1;
      }
    },
    empty: A
  };
  const E = (() => {
    const e = document.createElement("span"),
      t = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      },
      i = Object.keys(t).find(t => void 0 !== e.style[t]);
    return !!S.string(i) && t[i];
  })();
  function P(e, t) {
    setTimeout(() => {
      try {
        e.hidden = !0, e.offsetHeight, e.hidden = !1;
      } catch (e) {}
    }, t);
  }
  var M = {
    isIE: Boolean(window.document.documentMode),
    isEdge: /Edge/g.test(navigator.userAgent),
    isWebKit: "WebkitAppearance" in document.documentElement.style && !/Edge/g.test(navigator.userAgent),
    isIPhone: /iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1,
    isIPadOS: "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1,
    isIos: /iPad|iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1
  };
  function N(e, t) {
    return t.split(".").reduce((e, t) => e && e[t], e);
  }
  function x(e = {}, ...t) {
    if (!t.length) return e;
    const i = t.shift();
    return S.object(i) ? (Object.keys(i).forEach(t => {
      S.object(i[t]) ? (Object.keys(e).includes(t) || Object.assign(e, {
        [t]: {}
      }), x(e[t], i[t])) : Object.assign(e, {
        [t]: i[t]
      });
    }), x(e, ...t)) : e;
  }
  function L(e, t) {
    const i = e.length ? e : [e];
    Array.from(i).reverse().forEach((e, i) => {
      const s = i > 0 ? t.cloneNode(!0) : t,
        n = e.parentNode,
        a = e.nextSibling;
      s.appendChild(e), a ? n.insertBefore(s, a) : n.appendChild(s);
    });
  }
  function I(e, t) {
    S.element(e) && !S.empty(t) && Object.entries(t).filter(([, e]) => !S.nullOrUndefined(e)).forEach(([t, i]) => e.setAttribute(t, i));
  }
  function $(e, t, i) {
    const s = document.createElement(e);
    return S.object(t) && I(s, t), S.string(i) && (s.innerText = i), s;
  }
  function _(e, t, i, s) {
    S.element(t) && t.appendChild($(e, i, s));
  }
  function O(e) {
    S.nodeList(e) || S.array(e) ? Array.from(e).forEach(O) : S.element(e) && S.element(e.parentNode) && e.parentNode.removeChild(e);
  }
  function j(e) {
    if (!S.element(e)) return;
    let {
      length: t
    } = e.childNodes;
    for (; t > 0;) e.removeChild(e.lastChild), t -= 1;
  }
  function q(e, t) {
    return S.element(t) && S.element(t.parentNode) && S.element(e) ? (t.parentNode.replaceChild(e, t), e) : null;
  }
  function D(e, t) {
    if (!S.string(e) || S.empty(e)) return {};
    const i = {},
      s = x({}, t);
    return e.split(",").forEach(e => {
      const t = e.trim(),
        n = t.replace(".", ""),
        a = t.replace(/[[\]]/g, "").split("="),
        [l] = a,
        r = a.length > 1 ? a[1].replace(/["']/g, "") : "";
      switch (t.charAt(0)) {
        case ".":
          S.string(s.class) ? i.class = `${s.class} ${n}` : i.class = n;
          break;
        case "#":
          i.id = t.replace("#", "");
          break;
        case "[":
          i[l] = r;
      }
    }), x(s, i);
  }
  function H(e, t) {
    if (!S.element(e)) return;
    let i = t;
    S.boolean(i) || (i = !e.hidden), e.hidden = i;
  }
  function R(e, t, i) {
    if (S.nodeList(e)) return Array.from(e).map(e => R(e, t, i));
    if (S.element(e)) {
      let s = "toggle";
      return void 0 !== i && (s = i ? "add" : "remove"), e.classList[s](t), e.classList.contains(t);
    }
    return !1;
  }
  function F(e, t) {
    return S.element(e) && e.classList.contains(t);
  }
  function V(e, t) {
    const {
      prototype: i
    } = Element;
    return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }).call(e, t);
  }
  function U(e) {
    return this.elements.container.querySelectorAll(e);
  }
  function B(e) {
    return this.elements.container.querySelector(e);
  }
  function W(e = null, t = !1) {
    S.element(e) && e.focus({
      preventScroll: !0,
      focusVisible: t
    });
  }
  const z = {
      "audio/ogg": "vorbis",
      "audio/wav": "1",
      "video/webm": "vp8, vorbis",
      "video/mp4": "avc1.42E01E, mp4a.40.2",
      "video/ogg": "theora"
    },
    K = {
      audio: "canPlayType" in document.createElement("audio"),
      video: "canPlayType" in document.createElement("video"),
      check(e, t) {
        const i = K[e] || "html5" !== t;
        return {
          api: i,
          ui: i && K.rangeInput
        };
      },
      pip: !(M.isIPhone || !S.function($("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || $("video").disablePictureInPicture)),
      airplay: S.function(window.WebKitPlaybackTargetAvailabilityEvent),
      playsinline: "playsInline" in document.createElement("video"),
      mime(e) {
        if (S.empty(e)) return !1;
        const [t] = e.split("/");
        let i = e;
        if (!this.isHTML5 || t !== this.type) return !1;
        Object.keys(z).includes(i) && (i += `; codecs="${z[e]}"`);
        try {
          return Boolean(i && this.media.canPlayType(i).replace(/no/, ""));
        } catch (e) {
          return !1;
        }
      },
      textTracks: "textTracks" in document.createElement("video"),
      rangeInput: (() => {
        const e = document.createElement("input");
        return e.type = "range", "range" === e.type;
      })(),
      touch: "ontouchstart" in document.documentElement,
      transitions: !1 !== E,
      reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
    },
    Y = (() => {
      let e = !1;
      try {
        const t = Object.defineProperty({}, "passive", {
          get: () => (e = !0, null)
        });
        window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
      } catch (e) {}
      return e;
    })();
  function Q(e, t, i, s = !1, n = !0, a = !1) {
    if (!e || !("addEventListener" in e) || S.empty(t) || !S.function(i)) return;
    const l = t.split(" ");
    let r = a;
    Y && (r = {
      passive: n,
      capture: a
    }), l.forEach(t => {
      this && this.eventListeners && s && this.eventListeners.push({
        element: e,
        type: t,
        callback: i,
        options: r
      }), e[s ? "addEventListener" : "removeEventListener"](t, i, r);
    });
  }
  function X(e, t = "", i, s = !0, n = !1) {
    Q.call(this, e, t, i, !0, s, n);
  }
  function J(e, t = "", i, s = !0, n = !1) {
    Q.call(this, e, t, i, !1, s, n);
  }
  function G(e, t = "", i, s = !0, n = !1) {
    const a = (...l) => {
      J(e, t, a, s, n), i.apply(this, l);
    };
    Q.call(this, e, t, a, !0, s, n);
  }
  function Z(e, t = "", i = !1, s = {}) {
    if (!S.element(e) || S.empty(t)) return;
    const n = new CustomEvent(t, {
      bubbles: i,
      detail: {
        ...s,
        plyr: this
      }
    });
    e.dispatchEvent(n);
  }
  function ee() {
    this && this.eventListeners && (this.eventListeners.forEach(e => {
      const {
        element: t,
        type: i,
        callback: s,
        options: n
      } = e;
      t.removeEventListener(i, s, n);
    }), this.eventListeners = []);
  }
  function te() {
    return new Promise(e => this.ready ? setTimeout(e, 0) : X.call(this, this.elements.container, "ready", e)).then(() => {});
  }
  function ie(e) {
    S.promise(e) && e.then(null, () => {});
  }
  function se(e) {
    return S.array(e) ? e.filter((t, i) => e.indexOf(t) === i) : e;
  }
  function ne(e, t) {
    return S.array(e) && e.length ? e.reduce((e, i) => Math.abs(i - t) < Math.abs(e - t) ? i : e) : null;
  }
  function ae(e) {
    return !(!window || !window.CSS) && window.CSS.supports(e);
  }
  const le = [[1, 1], [4, 3], [3, 4], [5, 4], [4, 5], [3, 2], [2, 3], [16, 10], [10, 16], [16, 9], [9, 16], [21, 9], [9, 21], [32, 9], [9, 32]].reduce((e, [t, i]) => ({
    ...e,
    [t / i]: [t, i]
  }), {});
  function re(e) {
    if (!(S.array(e) || S.string(e) && e.includes(":"))) return !1;
    return (S.array(e) ? e : e.split(":")).map(Number).every(S.number);
  }
  function oe(e) {
    if (!S.array(e) || !e.every(S.number)) return null;
    const [t, i] = e,
      s = (e, t) => 0 === t ? e : s(t, e % t),
      n = s(t, i);
    return [t / n, i / n];
  }
  function ce(e) {
    const t = e => re(e) ? e.split(":").map(Number) : null;
    let i = t(e);
    if (null === i && (i = t(this.config.ratio)), null === i && !S.empty(this.embed) && S.array(this.embed.ratio) && ({
      ratio: i
    } = this.embed), null === i && this.isHTML5) {
      const {
        videoWidth: e,
        videoHeight: t
      } = this.media;
      i = [e, t];
    }
    return oe(i);
  }
  function ue(e) {
    if (!this.isVideo) return {};
    const {
        wrapper: t
      } = this.elements,
      i = ce.call(this, e);
    if (!S.array(i)) return {};
    const [s, n] = oe(i),
      a = 100 / s * n;
    if (ae(`aspect-ratio: ${s}/${n}`) ? t.style.aspectRatio = `${s}/${n}` : t.style.paddingBottom = `${a}%`, this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
      const e = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
        i = (e - a) / (e / 50);
      this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = `translateY(-${i}%)`;
    } else this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);
    return {
      padding: a,
      ratio: i
    };
  }
  function he(e, t, i = .05) {
    const s = e / t,
      n = ne(Object.keys(le), s);
    return Math.abs(n - s) <= i ? le[n] : [e, t];
  }
  const de = {
    getSources() {
      if (!this.isHTML5) return [];
      return Array.from(this.media.querySelectorAll("source")).filter(e => {
        const t = e.getAttribute("type");
        return !!S.empty(t) || K.mime.call(this, t);
      });
    },
    getQualityOptions() {
      return this.config.quality.forced ? this.config.quality.options : de.getSources.call(this).map(e => Number(e.getAttribute("size"))).filter(Boolean);
    },
    setup() {
      if (!this.isHTML5) return;
      const e = this;
      e.options.speed = e.config.speed.options, S.empty(this.config.ratio) || ue.call(e), Object.defineProperty(e.media, "quality", {
        get() {
          const t = de.getSources.call(e).find(t => t.getAttribute("src") === e.source);
          return t && Number(t.getAttribute("size"));
        },
        set(t) {
          if (e.quality !== t) {
            if (e.config.quality.forced && S.function(e.config.quality.onChange)) e.config.quality.onChange(t);else {
              const i = de.getSources.call(e).find(e => Number(e.getAttribute("size")) === t);
              if (!i) return;
              const {
                currentTime: s,
                paused: n,
                preload: a,
                readyState: l,
                playbackRate: r
              } = e.media;
              e.media.src = i.getAttribute("src"), ("none" !== a || l) && (e.once("loadedmetadata", () => {
                e.speed = r, e.currentTime = s, n || ie(e.play());
              }), e.media.load());
            }
            Z.call(e, e.media, "qualitychange", !1, {
              quality: t
            });
          }
        }
      });
    },
    cancelRequests() {
      this.isHTML5 && (O(de.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
    }
  };
  function me(e, ...t) {
    return S.empty(e) ? e : e.toString().replace(/{(\d+)}/g, (e, i) => t[i].toString());
  }
  const pe = (e = "", t = "", i = "") => e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString()),
    ge = (e = "") => e.toString().replace(/\w\S*/g, e => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase());
  function fe(e = "") {
    let t = e.toString();
    return t = function (e = "") {
      let t = e.toString();
      return t = pe(t, "-", " "), t = pe(t, "_", " "), t = ge(t), pe(t, " ", "");
    }(t), t.charAt(0).toLowerCase() + t.slice(1);
  }
  function ye(e) {
    const t = document.createElement("div");
    return t.appendChild(e), t.innerHTML;
  }
  const be = {
      pip: "PIP",
      airplay: "AirPlay",
      html5: "HTML5",
      vimeo: "Vimeo",
      youtube: "YouTube"
    },
    ve = {
      get(e = "", t = {}) {
        if (S.empty(e) || S.empty(t)) return "";
        let i = N(t.i18n, e);
        if (S.empty(i)) return Object.keys(be).includes(e) ? be[e] : "";
        const s = {
          "{seektime}": t.seekTime,
          "{title}": t.title
        };
        return Object.entries(s).forEach(([e, t]) => {
          i = pe(i, e, t);
        }), i;
      }
    };
  class we {
    constructor(t) {
      e(this, "get", e => {
        if (!we.supported || !this.enabled) return null;
        const t = window.localStorage.getItem(this.key);
        if (S.empty(t)) return null;
        const i = JSON.parse(t);
        return S.string(e) && e.length ? i[e] : i;
      }), e(this, "set", e => {
        if (!we.supported || !this.enabled) return;
        if (!S.object(e)) return;
        let t = this.get();
        S.empty(t) && (t = {}), x(t, e);
        try {
          window.localStorage.setItem(this.key, JSON.stringify(t));
        } catch (e) {}
      }), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key;
    }
    static get supported() {
      try {
        if (!("localStorage" in window)) return !1;
        const e = "___test";
        return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0;
      } catch (e) {
        return !1;
      }
    }
  }
  function Te(e, t = "text") {
    return new Promise((i, s) => {
      try {
        const s = new XMLHttpRequest();
        if (!("withCredentials" in s)) return;
        s.addEventListener("load", () => {
          if ("text" === t) try {
            i(JSON.parse(s.responseText));
          } catch (e) {
            i(s.responseText);
          } else i(s.response);
        }), s.addEventListener("error", () => {
          throw new Error(s.status);
        }), s.open("GET", e, !0), s.responseType = t, s.send();
      } catch (e) {
        s(e);
      }
    });
  }
  function ke(e, t) {
    if (!S.string(e)) return;
    const i = "cache",
      s = S.string(t);
    let n = !1;
    const a = () => null !== document.getElementById(t),
      l = (e, t) => {
        e.innerHTML = t, s && a() || document.body.insertAdjacentElement("afterbegin", e);
      };
    if (!s || !a()) {
      const a = we.supported,
        r = document.createElement("div");
      if (r.setAttribute("hidden", ""), s && r.setAttribute("id", t), a) {
        const e = window.localStorage.getItem(`${i}-${t}`);
        if (n = null !== e, n) {
          const t = JSON.parse(e);
          l(r, t.content);
        }
      }
      Te(e).then(e => {
        if (!S.empty(e)) {
          if (a) try {
            window.localStorage.setItem(`${i}-${t}`, JSON.stringify({
              content: e
            }));
          } catch (e) {}
          l(r, e);
        }
      }).catch(() => {});
    }
  }
  const Ce = e => Math.trunc(e / 60 / 60 % 60, 10),
    Ae = e => Math.trunc(e / 60 % 60, 10),
    Se = e => Math.trunc(e % 60, 10);
  function Ee(e = 0, t = !1, i = !1) {
    if (!S.number(e)) return Ee(void 0, t, i);
    const s = e => `0${e}`.slice(-2);
    let n = Ce(e);
    const a = Ae(e),
      l = Se(e);
    return n = t || n > 0 ? `${n}:` : "", `${i && e > 0 ? "-" : ""}${n}${s(a)}:${s(l)}`;
  }
  const Pe = {
    getIconUrl() {
      const e = new URL(this.config.iconUrl, window.location),
        t = window.location.host ? window.location.host : window.top.location.host,
        i = e.host !== t || M.isIE && !window.svg4everybody;
      return {
        url: this.config.iconUrl,
        cors: i
      };
    },
    findElements() {
      try {
        return this.elements.controls = B.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
          play: U.call(this, this.config.selectors.buttons.play),
          pause: B.call(this, this.config.selectors.buttons.pause),
          restart: B.call(this, this.config.selectors.buttons.restart),
          rewind: B.call(this, this.config.selectors.buttons.rewind),
          fastForward: B.call(this, this.config.selectors.buttons.fastForward),
          mute: B.call(this, this.config.selectors.buttons.mute),
          pip: B.call(this, this.config.selectors.buttons.pip),
          airplay: B.call(this, this.config.selectors.buttons.airplay),
          settings: B.call(this, this.config.selectors.buttons.settings),
          captions: B.call(this, this.config.selectors.buttons.captions),
          fullscreen: B.call(this, this.config.selectors.buttons.fullscreen)
        }, this.elements.progress = B.call(this, this.config.selectors.progress), this.elements.inputs = {
          seek: B.call(this, this.config.selectors.inputs.seek),
          volume: B.call(this, this.config.selectors.inputs.volume)
        }, this.elements.display = {
          buffer: B.call(this, this.config.selectors.display.buffer),
          currentTime: B.call(this, this.config.selectors.display.currentTime),
          duration: B.call(this, this.config.selectors.display.duration)
        }, S.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`)), !0;
      } catch (e) {
        return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1;
      }
    },
    createIcon(e, t) {
      const i = "http://www.w3.org/2000/svg",
        s = Pe.getIconUrl.call(this),
        n = `${s.cors ? "" : s.url}#${this.config.iconPrefix}`,
        a = document.createElementNS(i, "svg");
      I(a, x(t, {
        "aria-hidden": "true",
        focusable: "false"
      }));
      const l = document.createElementNS(i, "use"),
        r = `${n}-${e}`;
      return "href" in l && l.setAttributeNS("http://www.w3.org/1999/xlink", "href", r), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r), a.appendChild(l), a;
    },
    createLabel(e, t = {}) {
      const i = ve.get(e, this.config);
      return $("span", {
        ...t,
        class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
      }, i);
    },
    createBadge(e) {
      if (S.empty(e)) return null;
      const t = $("span", {
        class: this.config.classNames.menu.value
      });
      return t.appendChild($("span", {
        class: this.config.classNames.menu.badge
      }, e)), t;
    },
    createButton(e, t) {
      const i = x({}, t);
      let s = fe(e);
      const n = {
        element: "button",
        toggle: !1,
        label: null,
        icon: null,
        labelPressed: null,
        iconPressed: null
      };
      switch (["element", "icon", "label"].forEach(e => {
        Object.keys(i).includes(e) && (n[e] = i[e], delete i[e]);
      }), "button" !== n.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some(e => e === this.config.classNames.control) || x(i, {
        class: `${i.class} ${this.config.classNames.control}`
      }) : i.class = this.config.classNames.control, e) {
        case "play":
          n.toggle = !0, n.label = "play", n.labelPressed = "pause", n.icon = "play", n.iconPressed = "pause";
          break;
        case "mute":
          n.toggle = !0, n.label = "mute", n.labelPressed = "unmute", n.icon = "volume", n.iconPressed = "muted";
          break;
        case "captions":
          n.toggle = !0, n.label = "enableCaptions", n.labelPressed = "disableCaptions", n.icon = "captions-off", n.iconPressed = "captions-on";
          break;
        case "fullscreen":
          n.toggle = !0, n.label = "enterFullscreen", n.labelPressed = "exitFullscreen", n.icon = "enter-fullscreen", n.iconPressed = "exit-fullscreen";
          break;
        case "play-large":
          i.class += ` ${this.config.classNames.control}--overlaid`, s = "play", n.label = "play", n.icon = "play";
          break;
        default:
          S.empty(n.label) && (n.label = s), S.empty(n.icon) && (n.icon = e);
      }
      const a = $(n.element);
      return n.toggle ? (a.appendChild(Pe.createIcon.call(this, n.iconPressed, {
        class: "icon--pressed"
      })), a.appendChild(Pe.createIcon.call(this, n.icon, {
        class: "icon--not-pressed"
      })), a.appendChild(Pe.createLabel.call(this, n.labelPressed, {
        class: "label--pressed"
      })), a.appendChild(Pe.createLabel.call(this, n.label, {
        class: "label--not-pressed"
      }))) : (a.appendChild(Pe.createIcon.call(this, n.icon)), a.appendChild(Pe.createLabel.call(this, n.label))), x(i, D(this.config.selectors.buttons[s], i)), I(a, i), "play" === s ? (S.array(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(a)) : this.elements.buttons[s] = a, a;
    },
    createRange(e, t) {
      const i = $("input", x(D(this.config.selectors.inputs[e]), {
        type: "range",
        min: 0,
        max: 100,
        step: .01,
        value: 0,
        autocomplete: "off",
        role: "slider",
        "aria-label": ve.get(e, this.config),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": 0
      }, t));
      return this.elements.inputs[e] = i, Pe.updateRangeFill.call(this, i), g.setup(i), i;
    },
    createProgress(e, t) {
      const i = $("progress", x(D(this.config.selectors.display[e]), {
        min: 0,
        max: 100,
        value: 0,
        role: "progressbar",
        "aria-hidden": !0
      }, t));
      if ("volume" !== e) {
        i.appendChild($("span", null, "0"));
        const t = {
            played: "played",
            buffer: "buffered"
          }[e],
          s = t ? ve.get(t, this.config) : "";
        i.innerText = `% ${s.toLowerCase()}`;
      }
      return this.elements.display[e] = i, i;
    },
    createTime(e, t) {
      const i = D(this.config.selectors.display[e], t),
        s = $("div", x(i, {
          class: `${i.class ? i.class : ""} ${this.config.classNames.display.time} `.trim(),
          "aria-label": ve.get(e, this.config),
          role: "timer"
        }), "00:00");
      return this.elements.display[e] = s, s;
    },
    bindMenuItemShortcuts(e, t) {
      X.call(this, e, "keydown keyup", i => {
        if (![" ", "ArrowUp", "ArrowDown", "ArrowRight"].includes(i.key)) return;
        if (i.preventDefault(), i.stopPropagation(), "keydown" === i.type) return;
        const s = V(e, '[role="menuitemradio"]');
        if (!s && [" ", "ArrowRight"].includes(i.key)) Pe.showMenuPanel.call(this, t, !0);else {
          let t;
          " " !== i.key && ("ArrowDown" === i.key || s && "ArrowRight" === i.key ? (t = e.nextElementSibling, S.element(t) || (t = e.parentNode.firstElementChild)) : (t = e.previousElementSibling, S.element(t) || (t = e.parentNode.lastElementChild)), W.call(this, t, !0));
        }
      }, !1), X.call(this, e, "keyup", e => {
        "Return" === e.key && Pe.focusFirstMenuItem.call(this, null, !0);
      });
    },
    createMenuItem({
      value: e,
      list: t,
      type: i,
      title: s,
      badge: n = null,
      checked: a = !1
    }) {
      const l = D(this.config.selectors.inputs[i]),
        r = $("button", x(l, {
          type: "button",
          role: "menuitemradio",
          class: `${this.config.classNames.control} ${l.class ? l.class : ""}`.trim(),
          "aria-checked": a,
          value: e
        })),
        o = $("span");
      o.innerHTML = s, S.element(n) && o.appendChild(n), r.appendChild(o), Object.defineProperty(r, "checked", {
        enumerable: !0,
        get: () => "true" === r.getAttribute("aria-checked"),
        set(e) {
          e && Array.from(r.parentNode.children).filter(e => V(e, '[role="menuitemradio"]')).forEach(e => e.setAttribute("aria-checked", "false")), r.setAttribute("aria-checked", e ? "true" : "false");
        }
      }), this.listeners.bind(r, "click keyup", t => {
        if (!S.keyboardEvent(t) || " " === t.key) {
          switch (t.preventDefault(), t.stopPropagation(), r.checked = !0, i) {
            case "language":
              this.currentTrack = Number(e);
              break;
            case "quality":
              this.quality = e;
              break;
            case "speed":
              this.speed = parseFloat(e);
          }
          Pe.showMenuPanel.call(this, "home", S.keyboardEvent(t));
        }
      }, i, !1), Pe.bindMenuItemShortcuts.call(this, r, i), t.appendChild(r);
    },
    formatTime(e = 0, t = !1) {
      if (!S.number(e)) return e;
      return Ee(e, Ce(this.duration) > 0, t);
    },
    updateTimeDisplay(e = null, t = 0, i = !1) {
      S.element(e) && S.number(t) && (e.innerText = Pe.formatTime(t, i));
    },
    updateVolume() {
      this.supported.ui && (S.element(this.elements.inputs.volume) && Pe.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), S.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
    },
    setRange(e, t = 0) {
      S.element(e) && (e.value = t, Pe.updateRangeFill.call(this, e));
    },
    updateProgress(e) {
      if (!this.supported.ui || !S.event(e)) return;
      let t = 0;
      const i = (e, t) => {
        const i = S.number(t) ? t : 0,
          s = S.element(e) ? e : this.elements.display.buffer;
        if (S.element(s)) {
          s.value = i;
          const e = s.getElementsByTagName("span")[0];
          S.element(e) && (e.childNodes[0].nodeValue = i);
        }
      };
      if (e) switch (e.type) {
        case "timeupdate":
        case "seeking":
        case "seeked":
          s = this.currentTime, n = this.duration, t = 0 === s || 0 === n || Number.isNaN(s) || Number.isNaN(n) ? 0 : (s / n * 100).toFixed(2), "timeupdate" === e.type && Pe.setRange.call(this, this.elements.inputs.seek, t);
          break;
        case "playing":
        case "progress":
          i(this.elements.display.buffer, 100 * this.buffered);
      }
      var s, n;
    },
    updateRangeFill(e) {
      const t = S.event(e) ? e.target : e;
      if (S.element(t) && "range" === t.getAttribute("type")) {
        if (V(t, this.config.selectors.inputs.seek)) {
          t.setAttribute("aria-valuenow", this.currentTime);
          const e = Pe.formatTime(this.currentTime),
            i = Pe.formatTime(this.duration),
            s = ve.get("seekLabel", this.config);
          t.setAttribute("aria-valuetext", s.replace("{currentTime}", e).replace("{duration}", i));
        } else if (V(t, this.config.selectors.inputs.volume)) {
          const e = 100 * t.value;
          t.setAttribute("aria-valuenow", e), t.setAttribute("aria-valuetext", `${e.toFixed(1)}%`);
        } else t.setAttribute("aria-valuenow", t.value);
        (M.isWebKit || M.isIPadOS) && t.style.setProperty("--value", t.value / t.max * 100 + "%");
      }
    },
    updateSeekTooltip(e) {
      var t, i;
      if (!this.config.tooltips.seek || !S.element(this.elements.inputs.seek) || !S.element(this.elements.display.seekTooltip) || 0 === this.duration) return;
      const s = this.elements.display.seekTooltip,
        n = `${this.config.classNames.tooltip}--visible`,
        a = e => R(s, n, e);
      if (this.touch) return void a(!1);
      let l = 0;
      const r = this.elements.progress.getBoundingClientRect();
      if (S.event(e)) l = 100 / r.width * (e.pageX - r.left);else {
        if (!F(s, n)) return;
        l = parseFloat(s.style.left, 10);
      }
      l < 0 ? l = 0 : l > 100 && (l = 100);
      const o = this.duration / 100 * l;
      s.innerText = Pe.formatTime(o);
      const c = null === (t = this.config.markers) || void 0 === t || null === (i = t.points) || void 0 === i ? void 0 : i.find(({
        time: e
      }) => e === Math.round(o));
      c && s.insertAdjacentHTML("afterbegin", `${c.label}<br>`), s.style.left = `${l}%`, S.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && a("mouseenter" === e.type);
    },
    timeUpdate(e) {
      const t = !S.element(this.elements.display.duration) && this.config.invertTime;
      Pe.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || Pe.updateProgress.call(this, e);
    },
    durationUpdate() {
      if (!this.supported.ui || !this.config.invertTime && this.currentTime) return;
      if (this.duration >= 2 ** 32) return H(this.elements.display.currentTime, !0), void H(this.elements.progress, !0);
      S.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
      const e = S.element(this.elements.display.duration);
      !e && this.config.displayDuration && this.paused && Pe.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && Pe.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), this.config.markers.enabled && Pe.setMarkers.call(this), Pe.updateSeekTooltip.call(this);
    },
    toggleMenuButton(e, t) {
      H(this.elements.settings.buttons[e], !t);
    },
    updateSetting(e, t, i) {
      const s = this.elements.settings.panels[e];
      let n = null,
        a = t;
      if ("captions" === e) n = this.currentTrack;else {
        if (n = S.empty(i) ? this[e] : i, S.empty(n) && (n = this.config[e].default), !S.empty(this.options[e]) && !this.options[e].includes(n)) return void this.debug.warn(`Unsupported value of '${n}' for ${e}`);
        if (!this.config[e].options.includes(n)) return void this.debug.warn(`Disabled value of '${n}' for ${e}`);
      }
      if (S.element(a) || (a = s && s.querySelector('[role="menu"]')), !S.element(a)) return;
      this.elements.settings.buttons[e].querySelector(`.${this.config.classNames.menu.value}`).innerHTML = Pe.getLabel.call(this, e, n);
      const l = a && a.querySelector(`[value="${n}"]`);
      S.element(l) && (l.checked = !0);
    },
    getLabel(e, t) {
      switch (e) {
        case "speed":
          return 1 === t ? ve.get("normal", this.config) : `${t}&times;`;
        case "quality":
          if (S.number(t)) {
            const e = ve.get(`qualityLabel.${t}`, this.config);
            return e.length ? e : `${t}p`;
          }
          return ge(t);
        case "captions":
          return xe.getLabel.call(this);
        default:
          return null;
      }
    },
    setQualityMenu(e) {
      if (!S.element(this.elements.settings.panels.quality)) return;
      const t = "quality",
        i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
      S.array(e) && (this.options.quality = se(e).filter(e => this.config.quality.options.includes(e)));
      const s = !S.empty(this.options.quality) && this.options.quality.length > 1;
      if (Pe.toggleMenuButton.call(this, t, s), j(i), Pe.checkMenu.call(this), !s) return;
      const n = e => {
        const t = ve.get(`qualityBadge.${e}`, this.config);
        return t.length ? Pe.createBadge.call(this, t) : null;
      };
      this.options.quality.sort((e, t) => {
        const i = this.config.quality.options;
        return i.indexOf(e) > i.indexOf(t) ? 1 : -1;
      }).forEach(e => {
        Pe.createMenuItem.call(this, {
          value: e,
          list: i,
          type: t,
          title: Pe.getLabel.call(this, "quality", e),
          badge: n(e)
        });
      }), Pe.updateSetting.call(this, t, i);
    },
    setCaptionsMenu() {
      if (!S.element(this.elements.settings.panels.captions)) return;
      const e = "captions",
        t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
        i = xe.getTracks.call(this),
        s = Boolean(i.length);
      if (Pe.toggleMenuButton.call(this, e, s), j(t), Pe.checkMenu.call(this), !s) return;
      const n = i.map((e, i) => ({
        value: i,
        checked: this.captions.toggled && this.currentTrack === i,
        title: xe.getLabel.call(this, e),
        badge: e.language && Pe.createBadge.call(this, e.language.toUpperCase()),
        list: t,
        type: "language"
      }));
      n.unshift({
        value: -1,
        checked: !this.captions.toggled,
        title: ve.get("disabled", this.config),
        list: t,
        type: "language"
      }), n.forEach(Pe.createMenuItem.bind(this)), Pe.updateSetting.call(this, e, t);
    },
    setSpeedMenu() {
      if (!S.element(this.elements.settings.panels.speed)) return;
      const e = "speed",
        t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
      this.options.speed = this.options.speed.filter(e => e >= this.minimumSpeed && e <= this.maximumSpeed);
      const i = !S.empty(this.options.speed) && this.options.speed.length > 1;
      Pe.toggleMenuButton.call(this, e, i), j(t), Pe.checkMenu.call(this), i && (this.options.speed.forEach(i => {
        Pe.createMenuItem.call(this, {
          value: i,
          list: t,
          type: e,
          title: Pe.getLabel.call(this, "speed", i)
        });
      }), Pe.updateSetting.call(this, e, t));
    },
    checkMenu() {
      const {
          buttons: e
        } = this.elements.settings,
        t = !S.empty(e) && Object.values(e).some(e => !e.hidden);
      H(this.elements.settings.menu, !t);
    },
    focusFirstMenuItem(e, t = !1) {
      if (this.elements.settings.popup.hidden) return;
      let i = e;
      S.element(i) || (i = Object.values(this.elements.settings.panels).find(e => !e.hidden));
      const s = i.querySelector('[role^="menuitem"]');
      W.call(this, s, t);
    },
    toggleMenu(e) {
      const {
          popup: t
        } = this.elements.settings,
        i = this.elements.buttons.settings;
      if (!S.element(t) || !S.element(i)) return;
      const {
        hidden: s
      } = t;
      let n = s;
      if (S.boolean(e)) n = e;else if (S.keyboardEvent(e) && "Escape" === e.key) n = !1;else if (S.event(e)) {
        const s = S.function(e.composedPath) ? e.composedPath()[0] : e.target,
          a = t.contains(s);
        if (a || !a && e.target !== i && n) return;
      }
      i.setAttribute("aria-expanded", n), H(t, !n), R(this.elements.container, this.config.classNames.menu.open, n), n && S.keyboardEvent(e) ? Pe.focusFirstMenuItem.call(this, null, !0) : n || s || W.call(this, i, S.keyboardEvent(e));
    },
    getMenuSize(e) {
      const t = e.cloneNode(!0);
      t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
      const i = t.scrollWidth,
        s = t.scrollHeight;
      return O(t), {
        width: i,
        height: s
      };
    },
    showMenuPanel(e = "", t = !1) {
      const i = this.elements.container.querySelector(`#plyr-settings-${this.id}-${e}`);
      if (!S.element(i)) return;
      const s = i.parentNode,
        n = Array.from(s.children).find(e => !e.hidden);
      if (K.transitions && !K.reducedMotion) {
        s.style.width = `${n.scrollWidth}px`, s.style.height = `${n.scrollHeight}px`;
        const e = Pe.getMenuSize.call(this, i),
          t = e => {
            e.target === s && ["width", "height"].includes(e.propertyName) && (s.style.width = "", s.style.height = "", J.call(this, s, E, t));
          };
        X.call(this, s, E, t), s.style.width = `${e.width}px`, s.style.height = `${e.height}px`;
      }
      H(n, !0), H(i, !1), Pe.focusFirstMenuItem.call(this, i, t);
    },
    setDownloadUrl() {
      const e = this.elements.buttons.download;
      S.element(e) && e.setAttribute("href", this.download);
    },
    create(e) {
      const {
        bindMenuItemShortcuts: t,
        createButton: i,
        createProgress: s,
        createRange: n,
        createTime: a,
        setQualityMenu: l,
        setSpeedMenu: r,
        showMenuPanel: o
      } = Pe;
      this.elements.controls = null, S.array(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
      const c = $("div", D(this.config.selectors.controls.wrapper));
      this.elements.controls = c;
      const u = {
        class: "plyr__controls__item"
      };
      return se(S.array(this.config.controls) ? this.config.controls : []).forEach(l => {
        if ("restart" === l && c.appendChild(i.call(this, "restart", u)), "rewind" === l && c.appendChild(i.call(this, "rewind", u)), "play" === l && c.appendChild(i.call(this, "play", u)), "fast-forward" === l && c.appendChild(i.call(this, "fast-forward", u)), "progress" === l) {
          const t = $("div", {
              class: `${u.class} plyr__progress__container`
            }),
            i = $("div", D(this.config.selectors.progress));
          if (i.appendChild(n.call(this, "seek", {
            id: `plyr-seek-${e.id}`
          })), i.appendChild(s.call(this, "buffer")), this.config.tooltips.seek) {
            const e = $("span", {
              class: this.config.classNames.tooltip
            }, "00:00");
            i.appendChild(e), this.elements.display.seekTooltip = e;
          }
          this.elements.progress = i, t.appendChild(this.elements.progress), c.appendChild(t);
        }
        if ("current-time" === l && c.appendChild(a.call(this, "currentTime", u)), "duration" === l && c.appendChild(a.call(this, "duration", u)), "mute" === l || "volume" === l) {
          let {
            volume: t
          } = this.elements;
          if (S.element(t) && c.contains(t) || (t = $("div", x({}, u, {
            class: `${u.class} plyr__volume`.trim()
          })), this.elements.volume = t, c.appendChild(t)), "mute" === l && t.appendChild(i.call(this, "mute")), "volume" === l && !M.isIos && !M.isIPadOS) {
            const i = {
              max: 1,
              step: .05,
              value: this.config.volume
            };
            t.appendChild(n.call(this, "volume", x(i, {
              id: `plyr-volume-${e.id}`
            })));
          }
        }
        if ("captions" === l && c.appendChild(i.call(this, "captions", u)), "settings" === l && !S.empty(this.config.settings)) {
          const s = $("div", x({}, u, {
            class: `${u.class} plyr__menu`.trim(),
            hidden: ""
          }));
          s.appendChild(i.call(this, "settings", {
            "aria-haspopup": !0,
            "aria-controls": `plyr-settings-${e.id}`,
            "aria-expanded": !1
          }));
          const n = $("div", {
              class: "plyr__menu__container",
              id: `plyr-settings-${e.id}`,
              hidden: ""
            }),
            a = $("div"),
            l = $("div", {
              id: `plyr-settings-${e.id}-home`
            }),
            r = $("div", {
              role: "menu"
            });
          l.appendChild(r), a.appendChild(l), this.elements.settings.panels.home = l, this.config.settings.forEach(i => {
            const s = $("button", x(D(this.config.selectors.buttons.settings), {
              type: "button",
              class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
              role: "menuitem",
              "aria-haspopup": !0,
              hidden: ""
            }));
            t.call(this, s, i), X.call(this, s, "click", () => {
              o.call(this, i, !1);
            });
            const n = $("span", null, ve.get(i, this.config)),
              l = $("span", {
                class: this.config.classNames.menu.value
              });
            l.innerHTML = e[i], n.appendChild(l), s.appendChild(n), r.appendChild(s);
            const c = $("div", {
                id: `plyr-settings-${e.id}-${i}`,
                hidden: ""
              }),
              u = $("button", {
                type: "button",
                class: `${this.config.classNames.control} ${this.config.classNames.control}--back`
              });
            u.appendChild($("span", {
              "aria-hidden": !0
            }, ve.get(i, this.config))), u.appendChild($("span", {
              class: this.config.classNames.hidden
            }, ve.get("menuBack", this.config))), X.call(this, c, "keydown", e => {
              "ArrowLeft" === e.key && (e.preventDefault(), e.stopPropagation(), o.call(this, "home", !0));
            }, !1), X.call(this, u, "click", () => {
              o.call(this, "home", !1);
            }), c.appendChild(u), c.appendChild($("div", {
              role: "menu"
            })), a.appendChild(c), this.elements.settings.buttons[i] = s, this.elements.settings.panels[i] = c;
          }), n.appendChild(a), s.appendChild(n), c.appendChild(s), this.elements.settings.popup = n, this.elements.settings.menu = s;
        }
        if ("pip" === l && K.pip && c.appendChild(i.call(this, "pip", u)), "airplay" === l && K.airplay && c.appendChild(i.call(this, "airplay", u)), "download" === l) {
          const e = x({}, u, {
            element: "a",
            href: this.download,
            target: "_blank"
          });
          this.isHTML5 && (e.download = "");
          const {
            download: t
          } = this.config.urls;
          !S.url(t) && this.isEmbed && x(e, {
            icon: `logo-${this.provider}`,
            label: this.provider
          }), c.appendChild(i.call(this, "download", e));
        }
        "fullscreen" === l && c.appendChild(i.call(this, "fullscreen", u));
      }), this.isHTML5 && l.call(this, de.getQualityOptions.call(this)), r.call(this), c;
    },
    inject() {
      if (this.config.loadSprite) {
        const e = Pe.getIconUrl.call(this);
        e.cors && ke(e.url, "sprite-plyr");
      }
      this.id = Math.floor(1e4 * Math.random());
      let e = null;
      this.elements.controls = null;
      const t = {
        id: this.id,
        seektime: this.config.seekTime,
        title: this.config.title
      };
      let i = !0;
      S.function(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), S.element(this.config.controls) || S.string(this.config.controls) ? e = this.config.controls : (e = Pe.create.call(this, {
        id: this.id,
        seektime: this.config.seekTime,
        speed: this.speed,
        quality: this.quality,
        captions: xe.getLabel.call(this)
      }), i = !1);
      let s;
      i && S.string(this.config.controls) && (e = (e => {
        let i = e;
        return Object.entries(t).forEach(([e, t]) => {
          i = pe(i, `{${e}}`, t);
        }), i;
      })(e)), S.string(this.config.selectors.controls.container) && (s = document.querySelector(this.config.selectors.controls.container)), S.element(s) || (s = this.elements.container);
      if (s[S.element(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), S.element(this.elements.controls) || Pe.findElements.call(this), !S.empty(this.elements.buttons)) {
        const e = e => {
          const t = this.config.classNames.controlPressed;
          e.setAttribute("aria-pressed", "false"), Object.defineProperty(e, "pressed", {
            configurable: !0,
            enumerable: !0,
            get: () => F(e, t),
            set(i = !1) {
              R(e, t, i), e.setAttribute("aria-pressed", i ? "true" : "false");
            }
          });
        };
        Object.values(this.elements.buttons).filter(Boolean).forEach(t => {
          S.array(t) || S.nodeList(t) ? Array.from(t).filter(Boolean).forEach(e) : e(t);
        });
      }
      if (M.isEdge && P(s), this.config.tooltips.controls) {
        const {
            classNames: e,
            selectors: t
          } = this.config,
          i = `${t.controls.wrapper} ${t.labels} .${e.hidden}`,
          s = U.call(this, i);
        Array.from(s).forEach(e => {
          R(e, this.config.classNames.hidden, !1), R(e, this.config.classNames.tooltip, !0);
        });
      }
    },
    setMediaMetadata() {
      try {
        "mediaSession" in navigator && (navigator.mediaSession.metadata = new window.MediaMetadata({
          title: this.config.mediaMetadata.title,
          artist: this.config.mediaMetadata.artist,
          album: this.config.mediaMetadata.album,
          artwork: this.config.mediaMetadata.artwork
        }));
      } catch (e) {}
    },
    setMarkers() {
      var e, t;
      if (!this.duration || this.elements.markers) return;
      const i = null === (e = this.config.markers) || void 0 === e || null === (t = e.points) || void 0 === t ? void 0 : t.filter(({
        time: e
      }) => e > 0 && e < this.duration);
      if (null == i || !i.length) return;
      const s = document.createDocumentFragment(),
        n = document.createDocumentFragment();
      let a = null;
      const l = `${this.config.classNames.tooltip}--visible`,
        r = e => R(a, l, e);
      i.forEach(e => {
        const t = $("span", {
            class: this.config.classNames.marker
          }, ""),
          i = e.time / this.duration * 100 + "%";
        a && (t.addEventListener("mouseenter", () => {
          e.label || (a.style.left = i, a.innerHTML = e.label, r(!0));
        }), t.addEventListener("mouseleave", () => {
          r(!1);
        })), t.addEventListener("click", () => {
          this.currentTime = e.time;
        }), t.style.left = i, n.appendChild(t);
      }), s.appendChild(n), this.config.tooltips.seek || (a = $("span", {
        class: this.config.classNames.tooltip
      }, ""), s.appendChild(a)), this.elements.markers = {
        points: n,
        tip: a
      }, this.elements.progress.appendChild(s);
    }
  };
  function Me(e, t = !0) {
    let i = e;
    if (t) {
      const e = document.createElement("a");
      e.href = i, i = e.href;
    }
    try {
      return new URL(i);
    } catch (e) {
      return null;
    }
  }
  function Ne(e) {
    const t = new URLSearchParams();
    return S.object(e) && Object.entries(e).forEach(([e, i]) => {
      t.set(e, i);
    }), t;
  }
  const xe = {
      setup() {
        if (!this.supported.ui) return;
        if (!this.isVideo || this.isYouTube || this.isHTML5 && !K.textTracks) return void (S.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Pe.setCaptionsMenu.call(this));
        var e, t;
        if (S.element(this.elements.captions) || (this.elements.captions = $("div", D(this.config.selectors.captions)), this.elements.captions.setAttribute("dir", "auto"), e = this.elements.captions, t = this.elements.wrapper, S.element(e) && S.element(t) && t.parentNode.insertBefore(e, t.nextSibling)), M.isIE && window.URL) {
          const e = this.media.querySelectorAll("track");
          Array.from(e).forEach(e => {
            const t = e.getAttribute("src"),
              i = Me(t);
            null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && Te(t, "blob").then(t => {
              e.setAttribute("src", window.URL.createObjectURL(t));
            }).catch(() => {
              O(e);
            });
          });
        }
        const i = se((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(e => e.split("-")[0]));
        let s = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
        "auto" === s && ([s] = i);
        let n = this.storage.get("captions");
        if (S.boolean(n) || ({
          active: n
        } = this.config.captions), Object.assign(this.captions, {
          toggled: !1,
          active: n,
          language: s,
          languages: i
        }), this.isHTML5) {
          const e = this.config.captions.update ? "addtrack removetrack" : "removetrack";
          X.call(this, this.media.textTracks, e, xe.update.bind(this));
        }
        setTimeout(xe.update.bind(this), 0);
      },
      update() {
        const e = xe.getTracks.call(this, !0),
          {
            active: t,
            language: i,
            meta: s,
            currentTrackNode: n
          } = this.captions,
          a = Boolean(e.find(e => e.language === i));
        this.isHTML5 && this.isVideo && e.filter(e => !s.get(e)).forEach(e => {
          this.debug.log("Track added", e), s.set(e, {
            default: "showing" === e.mode
          }), "showing" === e.mode && (e.mode = "hidden"), X.call(this, e, "cuechange", () => xe.updateCues.call(this));
        }), (a && this.language !== i || !e.includes(n)) && (xe.setLanguage.call(this, i), xe.toggle.call(this, t && a)), this.elements && R(this.elements.container, this.config.classNames.captions.enabled, !S.empty(e)), S.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Pe.setCaptionsMenu.call(this);
      },
      toggle(e, t = !0) {
        if (!this.supported.ui) return;
        const {
            toggled: i
          } = this.captions,
          s = this.config.classNames.captions.active,
          n = S.nullOrUndefined(e) ? !i : e;
        if (n !== i) {
          if (t || (this.captions.active = n, this.storage.set({
            captions: n
          })), !this.language && n && !t) {
            const e = xe.getTracks.call(this),
              t = xe.findTrack.call(this, [this.captions.language, ...this.captions.languages], !0);
            return this.captions.language = t.language, void xe.set.call(this, e.indexOf(t));
          }
          this.elements.buttons.captions && (this.elements.buttons.captions.pressed = n), R(this.elements.container, s, n), this.captions.toggled = n, Pe.updateSetting.call(this, "captions"), Z.call(this, this.media, n ? "captionsenabled" : "captionsdisabled");
        }
        setTimeout(() => {
          n && this.captions.toggled && (this.captions.currentTrackNode.mode = "hidden");
        });
      },
      set(e, t = !0) {
        const i = xe.getTracks.call(this);
        if (-1 !== e) {
          if (S.number(e)) {
            if (e in i) {
              if (this.captions.currentTrack !== e) {
                this.captions.currentTrack = e;
                const s = i[e],
                  {
                    language: n
                  } = s || {};
                this.captions.currentTrackNode = s, Pe.updateSetting.call(this, "captions"), t || (this.captions.language = n, this.storage.set({
                  language: n
                })), this.isVimeo && this.embed.enableTextTrack(n), Z.call(this, this.media, "languagechange");
              }
              xe.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && xe.updateCues.call(this);
            } else this.debug.warn("Track not found", e);
          } else this.debug.warn("Invalid caption argument", e);
        } else xe.toggle.call(this, !1, t);
      },
      setLanguage(e, t = !0) {
        if (!S.string(e)) return void this.debug.warn("Invalid language argument", e);
        const i = e.toLowerCase();
        this.captions.language = i;
        const s = xe.getTracks.call(this),
          n = xe.findTrack.call(this, [i]);
        xe.set.call(this, s.indexOf(n), t);
      },
      getTracks(e = !1) {
        return Array.from((this.media || {}).textTracks || []).filter(t => !this.isHTML5 || e || this.captions.meta.has(t)).filter(e => ["captions", "subtitles"].includes(e.kind));
      },
      findTrack(e, t = !1) {
        const i = xe.getTracks.call(this),
          s = e => Number((this.captions.meta.get(e) || {}).default),
          n = Array.from(i).sort((e, t) => s(t) - s(e));
        let a;
        return e.every(e => (a = n.find(t => t.language === e), !a)), a || (t ? n[0] : void 0);
      },
      getCurrentTrack() {
        return xe.getTracks.call(this)[this.currentTrack];
      },
      getLabel(e) {
        let t = e;
        return !S.track(t) && K.textTracks && this.captions.toggled && (t = xe.getCurrentTrack.call(this)), S.track(t) ? S.empty(t.label) ? S.empty(t.language) ? ve.get("enabled", this.config) : e.language.toUpperCase() : t.label : ve.get("disabled", this.config);
      },
      updateCues(e) {
        if (!this.supported.ui) return;
        if (!S.element(this.elements.captions)) return void this.debug.warn("No captions element to render to");
        if (!S.nullOrUndefined(e) && !Array.isArray(e)) return void this.debug.warn("updateCues: Invalid input", e);
        let t = e;
        if (!t) {
          const e = xe.getCurrentTrack.call(this);
          t = Array.from((e || {}).activeCues || []).map(e => e.getCueAsHTML()).map(ye);
        }
        const i = t.map(e => e.trim()).join("\n");
        if (i !== this.elements.captions.innerHTML) {
          j(this.elements.captions);
          const e = $("span", D(this.config.selectors.caption));
          e.innerHTML = i, this.elements.captions.appendChild(e), Z.call(this, this.media, "cuechange");
        }
      }
    },
    Le = {
      enabled: !0,
      title: "",
      debug: !1,
      autoplay: !1,
      autopause: !0,
      playsinline: !0,
      seekTime: 10,
      volume: 1,
      muted: !1,
      duration: null,
      displayDuration: !0,
      invertTime: !0,
      toggleInvert: !0,
      ratio: null,
      clickToPlay: !0,
      hideControls: !0,
      resetOnEnd: !1,
      disableContextMenu: !0,
      loadSprite: !0,
      iconPrefix: "plyr",
      iconUrl: "https://cdn.plyr.io/3.7.8/plyr.svg",
      blankVideo: "https://cdn.plyr.io/static/blank.mp4",
      quality: {
        default: 576,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
        forced: !1,
        onChange: null
      },
      loop: {
        active: !1
      },
      speed: {
        selected: 1,
        options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
      },
      keyboard: {
        focused: !0,
        global: !1
      },
      tooltips: {
        controls: !1,
        seek: !0
      },
      captions: {
        active: !1,
        language: "auto",
        update: !1
      },
      fullscreen: {
        enabled: !0,
        fallback: !0,
        iosNative: !1
      },
      storage: {
        enabled: !0,
        key: "plyr"
      },
      controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
      settings: ["captions", "quality", "speed"],
      i18n: {
        restart: "Restart",
        rewind: "Rewind {seektime}s",
        play: "Play",
        pause: "Pause",
        fastForward: "Forward {seektime}s",
        seek: "Seek",
        seekLabel: "{currentTime} of {duration}",
        played: "Played",
        buffered: "Buffered",
        currentTime: "Current time",
        duration: "Duration",
        volume: "Volume",
        mute: "Mute",
        unmute: "Unmute",
        enableCaptions: "Enable captions",
        disableCaptions: "Disable captions",
        download: "Download",
        enterFullscreen: "Enter fullscreen",
        exitFullscreen: "Exit fullscreen",
        frameTitle: "Player for {title}",
        captions: "Captions",
        settings: "Settings",
        pip: "PIP",
        menuBack: "Go back to previous menu",
        speed: "Speed",
        normal: "Normal",
        quality: "Quality",
        loop: "Loop",
        start: "Start",
        end: "End",
        all: "All",
        reset: "Reset",
        disabled: "Disabled",
        enabled: "Enabled",
        advertisement: "Ad",
        qualityBadge: {
          2160: "4K",
          1440: "HD",
          1080: "HD",
          720: "HD",
          576: "SD",
          480: "SD"
        }
      },
      urls: {
        download: null,
        vimeo: {
          sdk: "https://player.vimeo.com/api/player.js",
          iframe: "https://player.vimeo.com/video/{0}?{1}",
          api: "https://vimeo.com/api/oembed.json?url={0}"
        },
        youtube: {
          sdk: "https://www.youtube.com/iframe_api",
          api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
        },
        googleIMA: {
          sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
        }
      },
      listeners: {
        seek: null,
        play: null,
        pause: null,
        restart: null,
        rewind: null,
        fastForward: null,
        mute: null,
        volume: null,
        captions: null,
        download: null,
        fullscreen: null,
        pip: null,
        airplay: null,
        speed: null,
        quality: null,
        loop: null,
        language: null
      },
      events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
      selectors: {
        editable: "input, textarea, select, [contenteditable]",
        container: ".plyr",
        controls: {
          container: null,
          wrapper: ".plyr__controls"
        },
        labels: "[data-plyr]",
        buttons: {
          play: '[data-plyr="play"]',
          pause: '[data-plyr="pause"]',
          restart: '[data-plyr="restart"]',
          rewind: '[data-plyr="rewind"]',
          fastForward: '[data-plyr="fast-forward"]',
          mute: '[data-plyr="mute"]',
          captions: '[data-plyr="captions"]',
          download: '[data-plyr="download"]',
          fullscreen: '[data-plyr="fullscreen"]',
          pip: '[data-plyr="pip"]',
          airplay: '[data-plyr="airplay"]',
          settings: '[data-plyr="settings"]',
          loop: '[data-plyr="loop"]'
        },
        inputs: {
          seek: '[data-plyr="seek"]',
          volume: '[data-plyr="volume"]',
          speed: '[data-plyr="speed"]',
          language: '[data-plyr="language"]',
          quality: '[data-plyr="quality"]'
        },
        display: {
          currentTime: ".plyr__time--current",
          duration: ".plyr__time--duration",
          buffer: ".plyr__progress__buffer",
          loop: ".plyr__progress__loop",
          volume: ".plyr__volume--display"
        },
        progress: ".plyr__progress",
        captions: ".plyr__captions",
        caption: ".plyr__caption"
      },
      classNames: {
        type: "plyr--{0}",
        provider: "plyr--{0}",
        video: "plyr__video-wrapper",
        embed: "plyr__video-embed",
        videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
        embedContainer: "plyr__video-embed__container",
        poster: "plyr__poster",
        posterEnabled: "plyr__poster-enabled",
        ads: "plyr__ads",
        control: "plyr__control",
        controlPressed: "plyr__control--pressed",
        playing: "plyr--playing",
        paused: "plyr--paused",
        stopped: "plyr--stopped",
        loading: "plyr--loading",
        hover: "plyr--hover",
        tooltip: "plyr__tooltip",
        cues: "plyr__cues",
        marker: "plyr__progress__marker",
        hidden: "plyr__sr-only",
        hideControls: "plyr--hide-controls",
        isTouch: "plyr--is-touch",
        uiSupported: "plyr--full-ui",
        noTransition: "plyr--no-transition",
        display: {
          time: "plyr__time"
        },
        menu: {
          value: "plyr__menu__value",
          badge: "plyr__badge",
          open: "plyr--menu-open"
        },
        captions: {
          enabled: "plyr--captions-enabled",
          active: "plyr--captions-active"
        },
        fullscreen: {
          enabled: "plyr--fullscreen-enabled",
          fallback: "plyr--fullscreen-fallback"
        },
        pip: {
          supported: "plyr--pip-supported",
          active: "plyr--pip-active"
        },
        airplay: {
          supported: "plyr--airplay-supported",
          active: "plyr--airplay-active"
        },
        previewThumbnails: {
          thumbContainer: "plyr__preview-thumb",
          thumbContainerShown: "plyr__preview-thumb--is-shown",
          imageContainer: "plyr__preview-thumb__image-container",
          timeContainer: "plyr__preview-thumb__time-container",
          scrubbingContainer: "plyr__preview-scrubbing",
          scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
        }
      },
      attributes: {
        embed: {
          provider: "data-plyr-provider",
          id: "data-plyr-embed-id",
          hash: "data-plyr-embed-hash"
        }
      },
      ads: {
        enabled: !1,
        publisherId: "",
        tagUrl: ""
      },
      previewThumbnails: {
        enabled: !1,
        src: ""
      },
      vimeo: {
        byline: !1,
        portrait: !1,
        title: !1,
        speed: !0,
        transparent: !1,
        customControls: !0,
        referrerPolicy: null,
        premium: !1
      },
      youtube: {
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        customControls: !0,
        noCookie: !1
      },
      mediaMetadata: {
        title: "",
        artist: "",
        album: "",
        artwork: []
      },
      markers: {
        enabled: !1,
        points: []
      }
    },
    Ie = "picture-in-picture",
    $e = "inline",
    _e = {
      html5: "html5",
      youtube: "youtube",
      vimeo: "vimeo"
    },
    Oe = "audio",
    je = "video";
  const qe = () => {};
  class De {
    constructor(e = !1) {
      this.enabled = window.console && e, this.enabled && this.log("Debugging enabled");
    }
    get log() {
      return this.enabled ? Function.prototype.bind.call(console.log, console) : qe;
    }
    get warn() {
      return this.enabled ? Function.prototype.bind.call(console.warn, console) : qe;
    }
    get error() {
      return this.enabled ? Function.prototype.bind.call(console.error, console) : qe;
    }
  }
  class He {
    constructor(t) {
      e(this, "onChange", () => {
        if (!this.supported) return;
        const e = this.player.elements.buttons.fullscreen;
        S.element(e) && (e.pressed = this.active);
        const t = this.target === this.player.media ? this.target : this.player.elements.container;
        Z.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", !0);
      }), e(this, "toggleFallback", (e = !1) => {
        if (e ? this.scrollPosition = {
          x: window.scrollX ?? 0,
          y: window.scrollY ?? 0
        } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", R(this.target, this.player.config.classNames.fullscreen.fallback, e), M.isIos) {
          let t = document.head.querySelector('meta[name="viewport"]');
          const i = "viewport-fit=cover";
          t || (t = document.createElement("meta"), t.setAttribute("name", "viewport"));
          const s = S.string(t.content) && t.content.includes(i);
          e ? (this.cleanupViewport = !s, s || (t.content += `,${i}`)) : this.cleanupViewport && (t.content = t.content.split(",").filter(e => e.trim() !== i).join(","));
        }
        this.onChange();
      }), e(this, "trapFocus", e => {
        if (M.isIos || M.isIPadOS || !this.active || "Tab" !== e.key) return;
        const t = document.activeElement,
          i = U.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
          [s] = i,
          n = i[i.length - 1];
        t !== n || e.shiftKey ? t === s && e.shiftKey && (n.focus(), e.preventDefault()) : (s.focus(), e.preventDefault());
      }), e(this, "update", () => {
        if (this.supported) {
          let e;
          e = this.forceFallback ? "Fallback (forced)" : He.nativeSupported ? "Native" : "Fallback", this.player.debug.log(`${e} fullscreen enabled`);
        } else this.player.debug.log("Fullscreen not supported and fallback disabled");
        R(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.supported);
      }), e(this, "enter", () => {
        this.supported && (M.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !He.nativeSupported || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? S.empty(this.prefix) || this.target[`${this.prefix}Request${this.property}`]() : this.target.requestFullscreen({
          navigationUI: "hide"
        }));
      }), e(this, "exit", () => {
        if (this.supported) if (M.isIos && this.player.config.fullscreen.iosNative) this.player.isVimeo ? this.player.embed.exitFullscreen() : this.target.webkitEnterFullscreen(), ie(this.player.play());else if (!He.nativeSupported || this.forceFallback) this.toggleFallback(!1);else if (this.prefix) {
          if (!S.empty(this.prefix)) {
            const e = "moz" === this.prefix ? "Cancel" : "Exit";
            document[`${this.prefix}${e}${this.property}`]();
          }
        } else (document.cancelFullScreen || document.exitFullscreen).call(document);
      }), e(this, "toggle", () => {
        this.active ? this.exit() : this.enter();
      }), this.player = t, this.prefix = He.prefix, this.property = He.property, this.scrollPosition = {
        x: 0,
        y: 0
      }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function (e, t) {
        const {
          prototype: i
        } = Element;
        return (i.closest || function () {
          let e = this;
          do {
            if (V.matches(e, t)) return e;
            e = e.parentElement || e.parentNode;
          } while (null !== e && 1 === e.nodeType);
          return null;
        }).call(e, t);
      }(this.player.elements.container, t.config.fullscreen.container), X.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : `${this.prefix}fullscreenchange`, () => {
        this.onChange();
      }), X.call(this.player, this.player.elements.container, "dblclick", e => {
        S.element(this.player.elements.controls) && this.player.elements.controls.contains(e.target) || this.player.listeners.proxy(e, this.toggle, "fullscreen");
      }), X.call(this, this.player.elements.container, "keydown", e => this.trapFocus(e)), this.update();
    }
    static get nativeSupported() {
      return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
    }
    get useNative() {
      return He.nativeSupported && !this.forceFallback;
    }
    static get prefix() {
      if (S.function(document.exitFullscreen)) return "";
      let e = "";
      return ["webkit", "moz", "ms"].some(t => !(!S.function(document[`${t}ExitFullscreen`]) && !S.function(document[`${t}CancelFullScreen`])) && (e = t, !0)), e;
    }
    static get property() {
      return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
    }
    get supported() {
      return [this.player.config.fullscreen.enabled, this.player.isVideo, He.nativeSupported || this.player.config.fullscreen.fallback, !this.player.isYouTube || He.nativeSupported || !M.isIos || this.player.config.playsinline && !this.player.config.fullscreen.iosNative].every(Boolean);
    }
    get active() {
      if (!this.supported) return !1;
      if (!He.nativeSupported || this.forceFallback) return F(this.target, this.player.config.classNames.fullscreen.fallback);
      const e = this.prefix ? this.target.getRootNode()[`${this.prefix}${this.property}Element`] : this.target.getRootNode().fullscreenElement;
      return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target;
    }
    get target() {
      return M.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen ?? this.player.elements.container;
    }
  }
  function Re(e, t = 1) {
    return new Promise((i, s) => {
      const n = new Image(),
        a = () => {
          delete n.onload, delete n.onerror, (n.naturalWidth >= t ? i : s)(n);
        };
      Object.assign(n, {
        onload: a,
        onerror: a,
        src: e
      });
    });
  }
  const Fe = {
    addStyleHook() {
      R(this.elements.container, this.config.selectors.container.replace(".", ""), !0), R(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
    },
    toggleNativeControls(e = !1) {
      e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
    },
    build() {
      if (this.listeners.media(), !this.supported.ui) return this.debug.warn(`Basic support only for ${this.provider} ${this.type}`), void Fe.toggleNativeControls.call(this, !0);
      S.element(this.elements.controls) || (Pe.inject.call(this), this.listeners.controls()), Fe.toggleNativeControls.call(this), this.isHTML5 && xe.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, Pe.updateVolume.call(this), Pe.timeUpdate.call(this), Pe.durationUpdate.call(this), Fe.checkPlaying.call(this), R(this.elements.container, this.config.classNames.pip.supported, K.pip && this.isHTML5 && this.isVideo), R(this.elements.container, this.config.classNames.airplay.supported, K.airplay && this.isHTML5), R(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(() => {
        Z.call(this, this.media, "ready");
      }, 0), Fe.setTitle.call(this), this.poster && Fe.setPoster.call(this, this.poster, !1).catch(() => {}), this.config.duration && Pe.durationUpdate.call(this), this.config.mediaMetadata && Pe.setMediaMetadata.call(this);
    },
    setTitle() {
      let e = ve.get("play", this.config);
      if (S.string(this.config.title) && !S.empty(this.config.title) && (e += `, ${this.config.title}`), Array.from(this.elements.buttons.play || []).forEach(t => {
        t.setAttribute("aria-label", e);
      }), this.isEmbed) {
        const e = B.call(this, "iframe");
        if (!S.element(e)) return;
        const t = S.empty(this.config.title) ? "video" : this.config.title,
          i = ve.get("frameTitle", this.config);
        e.setAttribute("title", i.replace("{title}", t));
      }
    },
    togglePoster(e) {
      R(this.elements.container, this.config.classNames.posterEnabled, e);
    },
    setPoster(e, t = !0) {
      return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), te.call(this).then(() => Re(e)).catch(t => {
        throw e === this.poster && Fe.togglePoster.call(this, !1), t;
      }).then(() => {
        if (e !== this.poster) throw new Error("setPoster cancelled by later call to setPoster");
      }).then(() => (Object.assign(this.elements.poster.style, {
        backgroundImage: `url('${e}')`,
        backgroundSize: ""
      }), Fe.togglePoster.call(this, !0), e)));
    },
    checkPlaying(e) {
      R(this.elements.container, this.config.classNames.playing, this.playing), R(this.elements.container, this.config.classNames.paused, this.paused), R(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(e => {
        Object.assign(e, {
          pressed: this.playing
        }), e.setAttribute("aria-label", ve.get(this.playing ? "pause" : "play", this.config));
      }), S.event(e) && "timeupdate" === e.type || Fe.toggleControls.call(this);
    },
    checkLoading(e) {
      this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(() => {
        R(this.elements.container, this.config.classNames.loading, this.loading), Fe.toggleControls.call(this);
      }, this.loading ? 250 : 0);
    },
    toggleControls(e) {
      const {
        controls: t
      } = this.elements;
      if (t && this.config.hideControls) {
        const i = this.touch && this.lastSeekTime + 2e3 > Date.now();
        this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || i));
      }
    },
    migrateStyles() {
      Object.values({
        ...this.media.style
      }).filter(e => !S.empty(e) && S.string(e) && e.startsWith("--plyr")).forEach(e => {
        this.elements.container.style.setProperty(e, this.media.style.getPropertyValue(e)), this.media.style.removeProperty(e);
      }), S.empty(this.media.style) && this.media.removeAttribute("style");
    }
  };
  class Ve {
    constructor(t) {
      e(this, "firstTouch", () => {
        const {
            player: e
          } = this,
          {
            elements: t
          } = e;
        e.touch = !0, R(t.container, e.config.classNames.isTouch, !0);
      }), e(this, "global", (e = !0) => {
        const {
          player: t
        } = this;
        t.config.keyboard.global && Q.call(t, window, "keydown keyup", this.handleKey, e, !1), Q.call(t, document.body, "click", this.toggleMenu, e), G.call(t, document.body, "touchstart", this.firstTouch);
      }), e(this, "container", () => {
        const {
            player: e
          } = this,
          {
            config: t,
            elements: i,
            timers: s
          } = e;
        !t.keyboard.global && t.keyboard.focused && X.call(e, i.container, "keydown keyup", this.handleKey, !1), X.call(e, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", t => {
          const {
            controls: n
          } = i;
          n && "enterfullscreen" === t.type && (n.pressed = !1, n.hover = !1);
          let a = 0;
          ["touchstart", "touchmove", "mousemove"].includes(t.type) && (Fe.toggleControls.call(e, !0), a = e.touch ? 3e3 : 2e3), clearTimeout(s.controls), s.controls = setTimeout(() => Fe.toggleControls.call(e, !1), a);
        });
        const n = () => {
            if (!e.isVimeo || e.config.vimeo.premium) return;
            const t = i.wrapper,
              {
                active: s
              } = e.fullscreen,
              [n, a] = ce.call(e),
              l = ae(`aspect-ratio: ${n} / ${a}`);
            if (!s) return void (l ? (t.style.width = null, t.style.height = null) : (t.style.maxWidth = null, t.style.margin = null));
            const [r, o] = [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)],
              c = r / o > n / a;
            l ? (t.style.width = c ? "auto" : "100%", t.style.height = c ? "100%" : "auto") : (t.style.maxWidth = c ? o / a * n + "px" : null, t.style.margin = c ? "0 auto" : null);
          },
          a = () => {
            clearTimeout(s.resized), s.resized = setTimeout(n, 50);
          };
        X.call(e, i.container, "enterfullscreen exitfullscreen", t => {
          const {
            target: s
          } = e.fullscreen;
          if (s !== i.container) return;
          if (!e.isEmbed && S.empty(e.config.ratio)) return;
          n();
          ("enterfullscreen" === t.type ? X : J).call(e, window, "resize", a);
        });
      }), e(this, "media", () => {
        const {
            player: e
          } = this,
          {
            elements: t
          } = e;
        if (X.call(e, e.media, "timeupdate seeking seeked", t => Pe.timeUpdate.call(e, t)), X.call(e, e.media, "durationchange loadeddata loadedmetadata", t => Pe.durationUpdate.call(e, t)), X.call(e, e.media, "ended", () => {
          e.isHTML5 && e.isVideo && e.config.resetOnEnd && (e.restart(), e.pause());
        }), X.call(e, e.media, "progress playing seeking seeked", t => Pe.updateProgress.call(e, t)), X.call(e, e.media, "volumechange", t => Pe.updateVolume.call(e, t)), X.call(e, e.media, "playing play pause ended emptied timeupdate", t => Fe.checkPlaying.call(e, t)), X.call(e, e.media, "waiting canplay seeked playing", t => Fe.checkLoading.call(e, t)), e.supported.ui && e.config.clickToPlay && !e.isAudio) {
          const i = B.call(e, `.${e.config.classNames.video}`);
          if (!S.element(i)) return;
          X.call(e, t.container, "click", s => {
            ([t.container, i].includes(s.target) || i.contains(s.target)) && (e.touch && e.config.hideControls || (e.ended ? (this.proxy(s, e.restart, "restart"), this.proxy(s, () => {
              ie(e.play());
            }, "play")) : this.proxy(s, () => {
              ie(e.togglePlay());
            }, "play")));
          });
        }
        e.supported.ui && e.config.disableContextMenu && X.call(e, t.wrapper, "contextmenu", e => {
          e.preventDefault();
        }, !1), X.call(e, e.media, "volumechange", () => {
          e.storage.set({
            volume: e.volume,
            muted: e.muted
          });
        }), X.call(e, e.media, "ratechange", () => {
          Pe.updateSetting.call(e, "speed"), e.storage.set({
            speed: e.speed
          });
        }), X.call(e, e.media, "qualitychange", t => {
          Pe.updateSetting.call(e, "quality", null, t.detail.quality);
        }), X.call(e, e.media, "ready qualitychange", () => {
          Pe.setDownloadUrl.call(e);
        });
        const i = e.config.events.concat(["keyup", "keydown"]).join(" ");
        X.call(e, e.media, i, i => {
          let {
            detail: s = {}
          } = i;
          "error" === i.type && (s = e.media.error), Z.call(e, t.container, i.type, !0, s);
        });
      }), e(this, "proxy", (e, t, i) => {
        const {
            player: s
          } = this,
          n = s.config.listeners[i];
        let a = !0;
        S.function(n) && (a = n.call(s, e)), !1 !== a && S.function(t) && t.call(s, e);
      }), e(this, "bind", (e, t, i, s, n = !0) => {
        const {
            player: a
          } = this,
          l = a.config.listeners[s],
          r = S.function(l);
        X.call(a, e, t, e => this.proxy(e, i, s), n && !r);
      }), e(this, "controls", () => {
        const {
            player: e
          } = this,
          {
            elements: t
          } = e,
          i = M.isIE ? "change" : "input";
        if (t.buttons.play && Array.from(t.buttons.play).forEach(t => {
          this.bind(t, "click", () => {
            ie(e.togglePlay());
          }, "play");
        }), this.bind(t.buttons.restart, "click", e.restart, "restart"), this.bind(t.buttons.rewind, "click", () => {
          e.lastSeekTime = Date.now(), e.rewind();
        }, "rewind"), this.bind(t.buttons.fastForward, "click", () => {
          e.lastSeekTime = Date.now(), e.forward();
        }, "fastForward"), this.bind(t.buttons.mute, "click", () => {
          e.muted = !e.muted;
        }, "mute"), this.bind(t.buttons.captions, "click", () => e.toggleCaptions()), this.bind(t.buttons.download, "click", () => {
          Z.call(e, e.media, "download");
        }, "download"), this.bind(t.buttons.fullscreen, "click", () => {
          e.fullscreen.toggle();
        }, "fullscreen"), this.bind(t.buttons.pip, "click", () => {
          e.pip = "toggle";
        }, "pip"), this.bind(t.buttons.airplay, "click", e.airplay, "airplay"), this.bind(t.buttons.settings, "click", t => {
          t.stopPropagation(), t.preventDefault(), Pe.toggleMenu.call(e, t);
        }, null, !1), this.bind(t.buttons.settings, "keyup", t => {
          [" ", "Enter"].includes(t.key) && ("Enter" !== t.key ? (t.preventDefault(), t.stopPropagation(), Pe.toggleMenu.call(e, t)) : Pe.focusFirstMenuItem.call(e, null, !0));
        }, null, !1), this.bind(t.settings.menu, "keydown", t => {
          "Escape" === t.key && Pe.toggleMenu.call(e, t);
        }), this.bind(t.inputs.seek, "mousedown mousemove", e => {
          const i = t.progress.getBoundingClientRect(),
            s = 100 / i.width * (e.pageX - i.left);
          e.currentTarget.setAttribute("seek-value", s);
        }), this.bind(t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", t => {
          const i = t.currentTarget,
            s = "play-on-seeked";
          if (S.keyboardEvent(t) && !["ArrowLeft", "ArrowRight"].includes(t.key)) return;
          e.lastSeekTime = Date.now();
          const n = i.hasAttribute(s),
            a = ["mouseup", "touchend", "keyup"].includes(t.type);
          n && a ? (i.removeAttribute(s), ie(e.play())) : !a && e.playing && (i.setAttribute(s, ""), e.pause());
        }), M.isIos) {
          const t = U.call(e, 'input[type="range"]');
          Array.from(t).forEach(e => this.bind(e, i, e => P(e.target)));
        }
        this.bind(t.inputs.seek, i, t => {
          const i = t.currentTarget;
          let s = i.getAttribute("seek-value");
          S.empty(s) && (s = i.value), i.removeAttribute("seek-value"), e.currentTime = s / i.max * e.duration;
        }, "seek"), this.bind(t.progress, "mouseenter mouseleave mousemove", t => Pe.updateSeekTooltip.call(e, t)), this.bind(t.progress, "mousemove touchmove", t => {
          const {
            previewThumbnails: i
          } = e;
          i && i.loaded && i.startMove(t);
        }), this.bind(t.progress, "mouseleave touchend click", () => {
          const {
            previewThumbnails: t
          } = e;
          t && t.loaded && t.endMove(!1, !0);
        }), this.bind(t.progress, "mousedown touchstart", t => {
          const {
            previewThumbnails: i
          } = e;
          i && i.loaded && i.startScrubbing(t);
        }), this.bind(t.progress, "mouseup touchend", t => {
          const {
            previewThumbnails: i
          } = e;
          i && i.loaded && i.endScrubbing(t);
        }), M.isWebKit && Array.from(U.call(e, 'input[type="range"]')).forEach(t => {
          this.bind(t, "input", t => Pe.updateRangeFill.call(e, t.target));
        }), e.config.toggleInvert && !S.element(t.display.duration) && this.bind(t.display.currentTime, "click", () => {
          0 !== e.currentTime && (e.config.invertTime = !e.config.invertTime, Pe.timeUpdate.call(e));
        }), this.bind(t.inputs.volume, i, t => {
          e.volume = t.target.value;
        }, "volume"), this.bind(t.controls, "mouseenter mouseleave", i => {
          t.controls.hover = !e.touch && "mouseenter" === i.type;
        }), t.fullscreen && Array.from(t.fullscreen.children).filter(e => !e.contains(t.container)).forEach(i => {
          this.bind(i, "mouseenter mouseleave", i => {
            t.controls && (t.controls.hover = !e.touch && "mouseenter" === i.type);
          });
        }), this.bind(t.controls, "mousedown mouseup touchstart touchend touchcancel", e => {
          t.controls.pressed = ["mousedown", "touchstart"].includes(e.type);
        }), this.bind(t.controls, "focusin", () => {
          const {
            config: i,
            timers: s
          } = e;
          R(t.controls, i.classNames.noTransition, !0), Fe.toggleControls.call(e, !0), setTimeout(() => {
            R(t.controls, i.classNames.noTransition, !1);
          }, 0);
          const n = this.touch ? 3e3 : 4e3;
          clearTimeout(s.controls), s.controls = setTimeout(() => Fe.toggleControls.call(e, !1), n);
        }), this.bind(t.inputs.volume, "wheel", t => {
          const i = t.webkitDirectionInvertedFromDevice,
            [s, n] = [t.deltaX, -t.deltaY].map(e => i ? -e : e),
            a = Math.sign(Math.abs(s) > Math.abs(n) ? s : n);
          e.increaseVolume(a / 50);
          const {
            volume: l
          } = e.media;
          (1 === a && l < 1 || -1 === a && l > 0) && t.preventDefault();
        }, "volume", !1);
      }), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.firstTouch = this.firstTouch.bind(this);
    }
    handleKey(e) {
      const {
          player: t
        } = this,
        {
          elements: i
        } = t,
        {
          key: s,
          type: n,
          altKey: a,
          ctrlKey: l,
          metaKey: r,
          shiftKey: o
        } = e,
        c = "keydown" === n,
        u = c && s === this.lastKey;
      if (a || l || r || o) return;
      if (!s) return;
      if (c) {
        const n = document.activeElement;
        if (S.element(n)) {
          const {
              editable: s
            } = t.config.selectors,
            {
              seek: a
            } = i.inputs;
          if (n !== a && V(n, s)) return;
          if (" " === e.key && V(n, 'button, [role^="menuitem"]')) return;
        }
        switch ([" ", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "c", "f", "k", "l", "m"].includes(s) && (e.preventDefault(), e.stopPropagation()), s) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            u || (h = parseInt(s, 10), t.currentTime = t.duration / 10 * h);
            break;
          case " ":
          case "k":
            u || ie(t.togglePlay());
            break;
          case "ArrowUp":
            t.increaseVolume(.1);
            break;
          case "ArrowDown":
            t.decreaseVolume(.1);
            break;
          case "m":
            u || (t.muted = !t.muted);
            break;
          case "ArrowRight":
            t.forward();
            break;
          case "ArrowLeft":
            t.rewind();
            break;
          case "f":
            t.fullscreen.toggle();
            break;
          case "c":
            u || t.toggleCaptions();
            break;
          case "l":
            t.loop = !t.loop;
        }
        "Escape" === s && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = s;
      } else this.lastKey = null;
      var h;
    }
    toggleMenu(e) {
      Pe.toggleMenu.call(this.player, e);
    }
  }
  "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof __webpack_require__.g ? __webpack_require__.g : "undefined" != typeof self && self;
  var Ue = function (e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
  }(function (e, t) {
    e.exports = function () {
      var e = function () {},
        t = {},
        i = {},
        s = {};
      function n(e, t) {
        e = e.push ? e : [e];
        var n,
          a,
          l,
          r = [],
          o = e.length,
          c = o;
        for (n = function (e, i) {
          i.length && r.push(e), --c || t(r);
        }; o--;) a = e[o], (l = i[a]) ? n(a, l) : (s[a] = s[a] || []).push(n);
      }
      function a(e, t) {
        if (e) {
          var n = s[e];
          if (i[e] = t, n) for (; n.length;) n[0](e, t), n.splice(0, 1);
        }
      }
      function l(t, i) {
        t.call && (t = {
          success: t
        }), i.length ? (t.error || e)(i) : (t.success || e)(t);
      }
      function r(t, i, s, n) {
        var a,
          l,
          o = document,
          c = s.async,
          u = (s.numRetries || 0) + 1,
          h = s.before || e,
          d = t.replace(/[\?|#].*$/, ""),
          m = t.replace(/^(css|img)!/, "");
        n = n || 0, /(^css!|\.css$)/.test(d) ? ((l = o.createElement("link")).rel = "stylesheet", l.href = m, (a = "hideFocus" in l) && l.relList && (a = 0, l.rel = "preload", l.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d) ? (l = o.createElement("img")).src = m : ((l = o.createElement("script")).src = t, l.async = void 0 === c || c), l.onload = l.onerror = l.onbeforeload = function (e) {
          var o = e.type[0];
          if (a) try {
            l.sheet.cssText.length || (o = "e");
          } catch (e) {
            18 != e.code && (o = "e");
          }
          if ("e" == o) {
            if ((n += 1) < u) return r(t, i, s, n);
          } else if ("preload" == l.rel && "style" == l.as) return l.rel = "stylesheet";
          i(t, o, e.defaultPrevented);
        }, !1 !== h(t, l) && o.head.appendChild(l);
      }
      function o(e, t, i) {
        var s,
          n,
          a = (e = e.push ? e : [e]).length,
          l = a,
          o = [];
        for (s = function (e, i, s) {
          if ("e" == i && o.push(e), "b" == i) {
            if (!s) return;
            o.push(e);
          }
          --a || t(o);
        }, n = 0; n < l; n++) r(e[n], s, i);
      }
      function c(e, i, s) {
        var n, r;
        if (i && i.trim && (n = i), r = (n ? s : i) || {}, n) {
          if (n in t) throw "LoadJS";
          t[n] = !0;
        }
        function c(t, i) {
          o(e, function (e) {
            l(r, e), t && l({
              success: t,
              error: i
            }, e), a(n, e);
          }, r);
        }
        if (r.returnPromise) return new Promise(c);
        c();
      }
      return c.ready = function (e, t) {
        return n(e, function (e) {
          l(t, e);
        }), c;
      }, c.done = function (e) {
        a(e, []);
      }, c.reset = function () {
        t = {}, i = {}, s = {};
      }, c.isDefined = function (e) {
        return e in t;
      }, c;
    }();
  });
  function Be(e) {
    return new Promise((t, i) => {
      Ue(e, {
        success: t,
        error: i
      });
    });
  }
  function We(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, Z.call(this, this.media, e ? "play" : "pause"));
  }
  const ze = {
    setup() {
      const e = this;
      R(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, ue.call(e), S.object(window.Vimeo) ? ze.ready.call(e) : Be(e.config.urls.vimeo.sdk).then(() => {
        ze.ready.call(e);
      }).catch(t => {
        e.debug.warn("Vimeo SDK (player.js) failed to load", t);
      });
    },
    ready() {
      const e = this,
        t = e.config.vimeo,
        {
          premium: i,
          referrerPolicy: s,
          ...n
        } = t;
      let a = e.media.getAttribute("src"),
        l = "";
      S.empty(a) ? (a = e.media.getAttribute(e.config.attributes.embed.id), l = e.media.getAttribute(e.config.attributes.embed.hash)) : l = function (e) {
        const t = e.match(/^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/);
        return t && 5 === t.length ? t[4] : null;
      }(a);
      const r = l ? {
        h: l
      } : {};
      i && Object.assign(n, {
        controls: !1,
        sidedock: !1
      });
      const o = Ne({
          loop: e.config.loop.active,
          autoplay: e.autoplay,
          muted: e.muted,
          gesture: "media",
          playsinline: e.config.playsinline,
          ...r,
          ...n
        }),
        c = (u = a, S.empty(u) ? null : S.number(Number(u)) ? u : u.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : u);
      var u;
      const h = $("iframe"),
        d = me(e.config.urls.vimeo.iframe, c, o);
      if (h.setAttribute("src", d), h.setAttribute("allowfullscreen", ""), h.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), S.empty(s) || h.setAttribute("referrerPolicy", s), i || !t.customControls) h.setAttribute("data-poster", e.poster), e.media = q(h, e.media);else {
        const t = $("div", {
          class: e.config.classNames.embedContainer,
          "data-poster": e.poster
        });
        t.appendChild(h), e.media = q(t, e.media);
      }
      t.customControls || Te(me(e.config.urls.vimeo.api, d)).then(t => {
        !S.empty(t) && t.thumbnail_url && Fe.setPoster.call(e, t.thumbnail_url).catch(() => {});
      }), e.embed = new window.Vimeo.Player(h, {
        autopause: e.config.autopause,
        muted: e.muted
      }), e.media.paused = !0, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = () => (We.call(e, !0), e.embed.play()), e.media.pause = () => (We.call(e, !1), e.embed.pause()), e.media.stop = () => {
        e.pause(), e.currentTime = 0;
      };
      let {
        currentTime: m
      } = e.media;
      Object.defineProperty(e.media, "currentTime", {
        get: () => m,
        set(t) {
          const {
              embed: i,
              media: s,
              paused: n,
              volume: a
            } = e,
            l = n && !i.hasPlayed;
          s.seeking = !0, Z.call(e, s, "seeking"), Promise.resolve(l && i.setVolume(0)).then(() => i.setCurrentTime(t)).then(() => l && i.pause()).then(() => l && i.setVolume(a)).catch(() => {});
        }
      });
      let p = e.config.speed.selected;
      Object.defineProperty(e.media, "playbackRate", {
        get: () => p,
        set(t) {
          e.embed.setPlaybackRate(t).then(() => {
            p = t, Z.call(e, e.media, "ratechange");
          }).catch(() => {
            e.options.speed = [1];
          });
        }
      });
      let {
        volume: g
      } = e.config;
      Object.defineProperty(e.media, "volume", {
        get: () => g,
        set(t) {
          e.embed.setVolume(t).then(() => {
            g = t, Z.call(e, e.media, "volumechange");
          });
        }
      });
      let {
        muted: f
      } = e.config;
      Object.defineProperty(e.media, "muted", {
        get: () => f,
        set(t) {
          const i = !!S.boolean(t) && t;
          e.embed.setMuted(!!i || e.config.muted).then(() => {
            f = i, Z.call(e, e.media, "volumechange");
          });
        }
      });
      let y,
        {
          loop: b
        } = e.config;
      Object.defineProperty(e.media, "loop", {
        get: () => b,
        set(t) {
          const i = S.boolean(t) ? t : e.config.loop.active;
          e.embed.setLoop(i).then(() => {
            b = i;
          });
        }
      }), e.embed.getVideoUrl().then(t => {
        y = t, Pe.setDownloadUrl.call(e);
      }).catch(e => {
        this.debug.warn(e);
      }), Object.defineProperty(e.media, "currentSrc", {
        get: () => y
      }), Object.defineProperty(e.media, "ended", {
        get: () => e.currentTime === e.duration
      }), Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then(t => {
        const [i, s] = t;
        e.embed.ratio = he(i, s), ue.call(this);
      }), e.embed.setAutopause(e.config.autopause).then(t => {
        e.config.autopause = t;
      }), e.embed.getVideoTitle().then(t => {
        e.config.title = t, Fe.setTitle.call(this);
      }), e.embed.getCurrentTime().then(t => {
        m = t, Z.call(e, e.media, "timeupdate");
      }), e.embed.getDuration().then(t => {
        e.media.duration = t, Z.call(e, e.media, "durationchange");
      }), e.embed.getTextTracks().then(t => {
        e.media.textTracks = t, xe.setup.call(e);
      }), e.embed.on("cuechange", ({
        cues: t = []
      }) => {
        const i = t.map(e => function (e) {
          const t = document.createDocumentFragment(),
            i = document.createElement("div");
          return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
        }(e.text));
        xe.updateCues.call(e, i);
      }), e.embed.on("loaded", () => {
        if (e.embed.getPaused().then(t => {
          We.call(e, !t), t || Z.call(e, e.media, "playing");
        }), S.element(e.embed.element) && e.supported.ui) {
          e.embed.element.setAttribute("tabindex", -1);
        }
      }), e.embed.on("bufferstart", () => {
        Z.call(e, e.media, "waiting");
      }), e.embed.on("bufferend", () => {
        Z.call(e, e.media, "playing");
      }), e.embed.on("play", () => {
        We.call(e, !0), Z.call(e, e.media, "playing");
      }), e.embed.on("pause", () => {
        We.call(e, !1);
      }), e.embed.on("timeupdate", t => {
        e.media.seeking = !1, m = t.seconds, Z.call(e, e.media, "timeupdate");
      }), e.embed.on("progress", t => {
        e.media.buffered = t.percent, Z.call(e, e.media, "progress"), 1 === parseInt(t.percent, 10) && Z.call(e, e.media, "canplaythrough"), e.embed.getDuration().then(t => {
          t !== e.media.duration && (e.media.duration = t, Z.call(e, e.media, "durationchange"));
        });
      }), e.embed.on("seeked", () => {
        e.media.seeking = !1, Z.call(e, e.media, "seeked");
      }), e.embed.on("ended", () => {
        e.media.paused = !0, Z.call(e, e.media, "ended");
      }), e.embed.on("error", t => {
        e.media.error = t, Z.call(e, e.media, "error");
      }), t.customControls && setTimeout(() => Fe.build.call(e), 0);
    }
  };
  function Ke(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, Z.call(this, this.media, e ? "play" : "pause"));
  }
  function Ye(e) {
    return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
  }
  const Qe = {
      setup() {
        if (R(this.elements.wrapper, this.config.classNames.embed, !0), S.object(window.YT) && S.function(window.YT.Player)) Qe.ready.call(this);else {
          const e = window.onYouTubeIframeAPIReady;
          window.onYouTubeIframeAPIReady = () => {
            S.function(e) && e(), Qe.ready.call(this);
          }, Be(this.config.urls.youtube.sdk).catch(e => {
            this.debug.warn("YouTube API failed to load", e);
          });
        }
      },
      getTitle(e) {
        Te(me(this.config.urls.youtube.api, e)).then(e => {
          if (S.object(e)) {
            const {
              title: t,
              height: i,
              width: s
            } = e;
            this.config.title = t, Fe.setTitle.call(this), this.embed.ratio = he(s, i);
          }
          ue.call(this);
        }).catch(() => {
          ue.call(this);
        });
      },
      ready() {
        const e = this,
          t = e.config.youtube,
          i = e.media && e.media.getAttribute("id");
        if (!S.empty(i) && i.startsWith("youtube-")) return;
        let s = e.media.getAttribute("src");
        S.empty(s) && (s = e.media.getAttribute(this.config.attributes.embed.id));
        const n = (a = s, S.empty(a) ? null : a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : a);
        var a;
        const l = $("div", {
          id: `${e.provider}-${Math.floor(1e4 * Math.random())}`,
          "data-poster": t.customControls ? e.poster : void 0
        });
        if (e.media = q(l, e.media), t.customControls) {
          const t = e => `https://i.ytimg.com/vi/${n}/${e}default.jpg`;
          Re(t("maxres"), 121).catch(() => Re(t("sd"), 121)).catch(() => Re(t("hq"))).then(t => Fe.setPoster.call(e, t.src)).then(t => {
            t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
          }).catch(() => {});
        }
        e.embed = new window.YT.Player(e.media, {
          videoId: n,
          host: Ye(t),
          playerVars: x({}, {
            autoplay: e.config.autoplay ? 1 : 0,
            hl: e.config.hl,
            controls: e.supported.ui && t.customControls ? 0 : 1,
            disablekb: 1,
            playsinline: e.config.playsinline && !e.config.fullscreen.iosNative ? 1 : 0,
            cc_load_policy: e.captions.active ? 1 : 0,
            cc_lang_pref: e.config.captions.language,
            widget_referrer: window ? window.location.href : null
          }, t),
          events: {
            onError(t) {
              if (!e.media.error) {
                const i = t.data,
                  s = {
                    2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                    5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                    100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                    101: "The owner of the requested video does not allow it to be played in embedded players.",
                    150: "The owner of the requested video does not allow it to be played in embedded players."
                  }[i] || "An unknown error occurred";
                e.media.error = {
                  code: i,
                  message: s
                }, Z.call(e, e.media, "error");
              }
            },
            onPlaybackRateChange(t) {
              const i = t.target;
              e.media.playbackRate = i.getPlaybackRate(), Z.call(e, e.media, "ratechange");
            },
            onReady(i) {
              if (S.function(e.media.play)) return;
              const s = i.target;
              Qe.getTitle.call(e, n), e.media.play = () => {
                Ke.call(e, !0), s.playVideo();
              }, e.media.pause = () => {
                Ke.call(e, !1), s.pauseVideo();
              }, e.media.stop = () => {
                s.stopVideo();
              }, e.media.duration = s.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                get: () => Number(s.getCurrentTime()),
                set(t) {
                  e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, Z.call(e, e.media, "seeking"), s.seekTo(t);
                }
              }), Object.defineProperty(e.media, "playbackRate", {
                get: () => s.getPlaybackRate(),
                set(e) {
                  s.setPlaybackRate(e);
                }
              });
              let {
                volume: a
              } = e.config;
              Object.defineProperty(e.media, "volume", {
                get: () => a,
                set(t) {
                  a = t, s.setVolume(100 * a), Z.call(e, e.media, "volumechange");
                }
              });
              let {
                muted: l
              } = e.config;
              Object.defineProperty(e.media, "muted", {
                get: () => l,
                set(t) {
                  const i = S.boolean(t) ? t : l;
                  l = i, s[i ? "mute" : "unMute"](), s.setVolume(100 * a), Z.call(e, e.media, "volumechange");
                }
              }), Object.defineProperty(e.media, "currentSrc", {
                get: () => s.getVideoUrl()
              }), Object.defineProperty(e.media, "ended", {
                get: () => e.currentTime === e.duration
              });
              const r = s.getAvailablePlaybackRates();
              e.options.speed = r.filter(t => e.config.speed.options.includes(t)), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), Z.call(e, e.media, "timeupdate"), Z.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(() => {
                e.media.buffered = s.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && Z.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), Z.call(e, e.media, "canplaythrough"));
              }, 200), t.customControls && setTimeout(() => Fe.build.call(e), 50);
            },
            onStateChange(i) {
              const s = i.target;
              clearInterval(e.timers.playing);
              switch (e.media.seeking && [1, 2].includes(i.data) && (e.media.seeking = !1, Z.call(e, e.media, "seeked")), i.data) {
                case -1:
                  Z.call(e, e.media, "timeupdate"), e.media.buffered = s.getVideoLoadedFraction(), Z.call(e, e.media, "progress");
                  break;
                case 0:
                  Ke.call(e, !1), e.media.loop ? (s.stopVideo(), s.playVideo()) : Z.call(e, e.media, "ended");
                  break;
                case 1:
                  t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (Ke.call(e, !0), Z.call(e, e.media, "playing"), e.timers.playing = setInterval(() => {
                    Z.call(e, e.media, "timeupdate");
                  }, 50), e.media.duration !== s.getDuration() && (e.media.duration = s.getDuration(), Z.call(e, e.media, "durationchange")));
                  break;
                case 2:
                  e.muted || e.embed.unMute(), Ke.call(e, !1);
                  break;
                case 3:
                  Z.call(e, e.media, "waiting");
              }
              Z.call(e, e.elements.container, "statechange", !1, {
                code: i.data
              });
            }
          }
        });
      }
    },
    Xe = {
      setup() {
        this.media ? (R(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), R(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && R(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = $("div", {
          class: this.config.classNames.video
        }), L(this.media, this.elements.wrapper), this.elements.poster = $("div", {
          class: this.config.classNames.poster
        }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? de.setup.call(this) : this.isYouTube ? Qe.setup.call(this) : this.isVimeo && ze.setup.call(this)) : this.debug.warn("No media element found!");
      }
    };
  class Je {
    constructor(t) {
      e(this, "load", () => {
        this.enabled && (S.object(window.google) && S.object(window.google.ima) ? this.ready() : Be(this.player.config.urls.googleIMA.sdk).then(() => {
          this.ready();
        }).catch(() => {
          this.trigger("error", new Error("Google IMA SDK failed to load"));
        }));
      }), e(this, "ready", () => {
        var e;
        this.enabled || ((e = this).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(() => {
          this.clearSafetyTimer("onAdsManagerLoaded()");
        }), this.listeners(), this.setupIMA();
      }), e(this, "setupIMA", () => {
        this.elements.container = $("div", {
          class: this.player.config.classNames.ads
        }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, e => this.onAdsManagerLoaded(e), !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e => this.onAdError(e), !1), this.requestAds();
      }), e(this, "requestAds", () => {
        const {
          container: e
        } = this.player.elements;
        try {
          const t = new google.ima.AdsRequest();
          t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t);
        } catch (e) {
          this.onAdError(e);
        }
      }), e(this, "pollCountdown", (e = !1) => {
        if (!e) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
        this.countdownTimer = setInterval(() => {
          const e = Ee(Math.max(this.manager.getRemainingTime(), 0)),
            t = `${ve.get("advertisement", this.player.config)} - ${e}`;
          this.elements.container.setAttribute("data-badge-text", t);
        }, 100);
      }), e(this, "onAdsManagerLoaded", e => {
        if (!this.enabled) return;
        const t = new google.ima.AdsRenderingSettings();
        t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, this.manager = e.getAdsManager(this.player, t), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e => this.onAdError(e)), Object.keys(google.ima.AdEvent.Type).forEach(e => {
          this.manager.addEventListener(google.ima.AdEvent.Type[e], e => this.onAdEvent(e));
        }), this.trigger("loaded");
      }), e(this, "addCuePoints", () => {
        S.empty(this.cuePoints) || this.cuePoints.forEach(e => {
          if (0 !== e && -1 !== e && e < this.player.duration) {
            const t = this.player.elements.progress;
            if (S.element(t)) {
              const i = 100 / this.player.duration * e,
                s = $("span", {
                  class: this.player.config.classNames.cues
                });
              s.style.left = `${i.toString()}%`, t.appendChild(s);
            }
          }
        });
      }), e(this, "onAdEvent", e => {
        const {
            container: t
          } = this.player.elements,
          i = e.getAd(),
          s = e.getAdData();
        switch ((e => {
          Z.call(this.player, this.player.media, `ads${e.replace(/_/g, "").toLowerCase()}`);
        })(e.type), e.type) {
          case google.ima.AdEvent.Type.LOADED:
            this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
            break;
          case google.ima.AdEvent.Type.STARTED:
            this.manager.setVolume(this.player.volume);
            break;
          case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            this.player.ended ? this.loadAds() : this.loader.contentComplete();
            break;
          case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
            this.pauseContent();
            break;
          case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
            this.pollCountdown(), this.resumeContent();
            break;
          case google.ima.AdEvent.Type.LOG:
            s.adError && this.player.debug.warn(`Non-fatal ad error: ${s.adError.getMessage()}`);
        }
      }), e(this, "onAdError", e => {
        this.cancel(), this.player.debug.warn("Ads error", e);
      }), e(this, "listeners", () => {
        const {
          container: e
        } = this.player.elements;
        let t;
        this.player.on("canplay", () => {
          this.addCuePoints();
        }), this.player.on("ended", () => {
          this.loader.contentComplete();
        }), this.player.on("timeupdate", () => {
          t = this.player.currentTime;
        }), this.player.on("seeked", () => {
          const e = this.player.currentTime;
          S.empty(this.cuePoints) || this.cuePoints.forEach((i, s) => {
            t < i && i < e && (this.manager.discardAdBreak(), this.cuePoints.splice(s, 1));
          });
        }), window.addEventListener("resize", () => {
          this.manager && this.manager.resize(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL);
        });
      }), e(this, "play", () => {
        const {
          container: e
        } = this.player.elements;
        this.managerPromise || this.resumeContent(), this.managerPromise.then(() => {
          this.manager.setVolume(this.player.volume), this.elements.displayContainer.initialize();
          try {
            this.initialized || (this.manager.init(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL), this.manager.start()), this.initialized = !0;
          } catch (e) {
            this.onAdError(e);
          }
        }).catch(() => {});
      }), e(this, "resumeContent", () => {
        this.elements.container.style.zIndex = "", this.playing = !1, ie(this.player.media.play());
      }), e(this, "pauseContent", () => {
        this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause();
      }), e(this, "cancel", () => {
        this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds();
      }), e(this, "loadAds", () => {
        this.managerPromise.then(() => {
          this.manager && this.manager.destroy(), this.managerPromise = new Promise(e => {
            this.on("loaded", e), this.player.debug.log(this.manager);
          }), this.initialized = !1, this.requestAds();
        }).catch(() => {});
      }), e(this, "trigger", (e, ...t) => {
        const i = this.events[e];
        S.array(i) && i.forEach(e => {
          S.function(e) && e.apply(this, t);
        });
      }), e(this, "on", (e, t) => (S.array(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this)), e(this, "startSafetyTimer", (e, t) => {
        this.player.debug.log(`Safety timer invoked from: ${t}`), this.safetyTimer = setTimeout(() => {
          this.cancel(), this.clearSafetyTimer("startSafetyTimer()");
        }, e);
      }), e(this, "clearSafetyTimer", e => {
        S.nullOrUndefined(this.safetyTimer) || (this.player.debug.log(`Safety timer cleared from: ${e}`), clearTimeout(this.safetyTimer), this.safetyTimer = null);
      }), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
        container: null,
        displayContainer: null
      }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((e, t) => {
        this.on("loaded", e), this.on("error", t);
      }), this.load();
    }
    get enabled() {
      const {
        config: e
      } = this;
      return this.player.isHTML5 && this.player.isVideo && e.enabled && (!S.empty(e.publisherId) || S.url(e.tagUrl));
    }
    get tagUrl() {
      const {
        config: e
      } = this;
      if (S.url(e.tagUrl)) return e.tagUrl;
      return `https://go.aniview.com/api/adserver6/vast/?${Ne({
        AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
        AV_CHANNELID: "5a0458dc28a06145e4519d21",
        AV_URL: window.location.hostname,
        cb: Date.now(),
        AV_WIDTH: 640,
        AV_HEIGHT: 480,
        AV_CDIM2: e.publisherId
      })}`;
    }
  }
  function Ge(e = 0, t = 0, i = 255) {
    return Math.min(Math.max(e, t), i);
  }
  const Ze = e => {
      const t = [];
      return e.split(/\r\n\r\n|\n\n|\r\r/).forEach(e => {
        const i = {};
        e.split(/\r\n|\n|\r/).forEach(e => {
          if (S.number(i.startTime)) {
            if (!S.empty(e.trim()) && S.empty(i.text)) {
              const t = e.trim().split("#xywh=");
              [i.text] = t, t[1] && ([i.x, i.y, i.w, i.h] = t[1].split(","));
            }
          } else {
            const t = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
            t && (i.startTime = 60 * Number(t[1] || 0) * 60 + 60 * Number(t[2]) + Number(t[3]) + Number(`0.${t[4]}`), i.endTime = 60 * Number(t[6] || 0) * 60 + 60 * Number(t[7]) + Number(t[8]) + Number(`0.${t[9]}`));
          }
        }), i.text && t.push(i);
      }), t;
    },
    et = (e, t) => {
      const i = {};
      return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i;
    };
  class tt {
    constructor(t) {
      e(this, "load", () => {
        this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(() => {
          this.enabled && (this.render(), this.determineContainerAutoSizing(), this.listeners(), this.loaded = !0);
        });
      }), e(this, "getThumbnails", () => new Promise(e => {
        const {
          src: t
        } = this.player.config.previewThumbnails;
        if (S.empty(t)) throw new Error("Missing previewThumbnails.src config attribute");
        const i = () => {
          this.thumbnails.sort((e, t) => e.height - t.height), this.player.debug.log("Preview thumbnails", this.thumbnails), e();
        };
        if (S.function(t)) t(e => {
          this.thumbnails = e, i();
        });else {
          const e = (S.string(t) ? [t] : t).map(e => this.getThumbnail(e));
          Promise.all(e).then(i);
        }
      })), e(this, "getThumbnail", e => new Promise(t => {
        Te(e).then(i => {
          const s = {
            frames: Ze(i),
            height: null,
            urlPrefix: ""
          };
          s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
          const n = new Image();
          n.onload = () => {
            s.height = n.naturalHeight, s.width = n.naturalWidth, this.thumbnails.push(s), t();
          }, n.src = s.urlPrefix + s.frames[0].text;
        });
      })), e(this, "startMove", e => {
        if (this.loaded && S.event(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
          if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);else {
            var t, i;
            const s = this.player.elements.progress.getBoundingClientRect(),
              n = 100 / s.width * (e.pageX - s.left);
            this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = Ee(this.seekTime);
            const a = null === (t = this.player.config.markers) || void 0 === t || null === (i = t.points) || void 0 === i ? void 0 : i.find(({
              time: e
            }) => e === Math.round(this.seekTime));
            a && this.elements.thumb.time.insertAdjacentHTML("afterbegin", `${a.label}<br>`);
          }
          this.showImageAtCurrentTime();
        }
      }), e(this, "endMove", () => {
        this.toggleThumbContainer(!1, !0);
      }), e(this, "startScrubbing", e => {
        (S.nullOrUndefined(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()));
      }), e(this, "endScrubbing", () => {
        this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : G.call(this.player, this.player.media, "timeupdate", () => {
          this.mouseDown || this.toggleScrubbingContainer(!1);
        });
      }), e(this, "listeners", () => {
        this.player.on("play", () => {
          this.toggleThumbContainer(!1, !0);
        }), this.player.on("seeked", () => {
          this.toggleThumbContainer(!1);
        }), this.player.on("timeupdate", () => {
          this.lastTime = this.player.media.currentTime;
        });
      }), e(this, "render", () => {
        this.elements.thumb.container = $("div", {
          class: this.player.config.classNames.previewThumbnails.thumbContainer
        }), this.elements.thumb.imageContainer = $("div", {
          class: this.player.config.classNames.previewThumbnails.imageContainer
        }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
        const e = $("div", {
          class: this.player.config.classNames.previewThumbnails.timeContainer
        });
        this.elements.thumb.time = $("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.imageContainer.appendChild(e), S.element(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = $("div", {
          class: this.player.config.classNames.previewThumbnails.scrubbingContainer
        }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
      }), e(this, "destroy", () => {
        this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove();
      }), e(this, "showImageAtCurrentTime", () => {
        this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
        const e = this.thumbnails[0].frames.findIndex(e => this.seekTime >= e.startTime && this.seekTime <= e.endTime),
          t = e >= 0;
        let i = 0;
        this.mouseDown || this.toggleThumbContainer(t), t && (this.thumbnails.forEach((t, s) => {
          this.loadedImages.includes(t.frames[e].text) && (i = s);
        }), e !== this.showingThumb && (this.showingThumb = e, this.loadImage(i)));
      }), e(this, "loadImage", (e = 0) => {
        const t = this.showingThumb,
          i = this.thumbnails[e],
          {
            urlPrefix: s
          } = i,
          n = i.frames[t],
          a = i.frames[t].text,
          l = s + a;
        if (this.currentImageElement && this.currentImageElement.dataset.filename === a) this.showImage(this.currentImageElement, n, e, t, a, !1), this.currentImageElement.dataset.index = t, this.removeOldImages(this.currentImageElement);else {
          this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
          const i = new Image();
          i.src = l, i.dataset.index = t, i.dataset.filename = a, this.showingThumbFilename = a, this.player.debug.log(`Loading image: ${l}`), i.onload = () => this.showImage(i, n, e, t, a, !0), this.loadingImage = i, this.removeOldImages(i);
        }
      }), e(this, "showImage", (e, t, i, s, n, a = !0) => {
        this.player.debug.log(`Showing thumb: ${n}. num: ${s}. qual: ${i}. newimg: ${a}`), this.setImageSizeAndOffset(e, t), a && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(n) || this.loadedImages.push(n)), this.preloadNearby(s, !0).then(this.preloadNearby(s, !1)).then(this.getHigherQuality(i, e, t, n));
      }), e(this, "removeOldImages", e => {
        Array.from(this.currentImageContainer.children).forEach(t => {
          if ("img" !== t.tagName.toLowerCase()) return;
          const i = this.usingSprites ? 500 : 1e3;
          if (t.dataset.index !== e.dataset.index && !t.dataset.deleting) {
            t.dataset.deleting = !0;
            const {
              currentImageContainer: e
            } = this;
            setTimeout(() => {
              e.removeChild(t), this.player.debug.log(`Removing thumb: ${t.dataset.filename}`);
            }, i);
          }
        });
      }), e(this, "preloadNearby", (e, t = !0) => new Promise(i => {
        setTimeout(() => {
          const s = this.thumbnails[0].frames[e].text;
          if (this.showingThumbFilename === s) {
            let n;
            n = t ? this.thumbnails[0].frames.slice(e) : this.thumbnails[0].frames.slice(0, e).reverse();
            let a = !1;
            n.forEach(e => {
              const t = e.text;
              if (t !== s && !this.loadedImages.includes(t)) {
                a = !0, this.player.debug.log(`Preloading thumb filename: ${t}`);
                const {
                    urlPrefix: e
                  } = this.thumbnails[0],
                  s = e + t,
                  n = new Image();
                n.src = s, n.onload = () => {
                  this.player.debug.log(`Preloaded thumb filename: ${t}`), this.loadedImages.includes(t) || this.loadedImages.push(t), i();
                };
              }
            }), a || i();
          }
        }, 300);
      })), e(this, "getHigherQuality", (e, t, i, s) => {
        if (e < this.thumbnails.length - 1) {
          let n = t.naturalHeight;
          this.usingSprites && (n = i.h), n < this.thumbContainerHeight && setTimeout(() => {
            this.showingThumbFilename === s && (this.player.debug.log(`Showing higher quality thumb for: ${s}`), this.loadImage(e + 1));
          }, 300);
        }
      }), e(this, "toggleThumbContainer", (e = !1, t = !1) => {
        const i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
        this.elements.thumb.container.classList.toggle(i, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null);
      }), e(this, "toggleScrubbingContainer", (e = !1) => {
        const t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
        this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null);
      }), e(this, "determineContainerAutoSizing", () => {
        (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = !0);
      }), e(this, "setThumbContainerSizeAndPos", () => {
        const {
          imageContainer: e
        } = this.elements.thumb;
        if (this.sizeSpecifiedInCSS) {
          if (e.clientHeight > 20 && e.clientWidth < 20) {
            const t = Math.floor(e.clientHeight * this.thumbAspectRatio);
            e.style.width = `${t}px`;
          } else if (e.clientHeight < 20 && e.clientWidth > 20) {
            const t = Math.floor(e.clientWidth / this.thumbAspectRatio);
            e.style.height = `${t}px`;
          }
        } else {
          const t = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
          e.style.height = `${this.thumbContainerHeight}px`, e.style.width = `${t}px`;
        }
        this.setThumbContainerPos();
      }), e(this, "setThumbContainerPos", () => {
        const e = this.player.elements.progress.getBoundingClientRect(),
          t = this.player.elements.container.getBoundingClientRect(),
          {
            container: i
          } = this.elements.thumb,
          s = t.left - e.left + 10,
          n = t.right - e.left - i.clientWidth - 10,
          a = this.mousePosX - e.left - i.clientWidth / 2,
          l = Ge(a, s, n);
        i.style.left = `${l}px`, i.style.setProperty("--preview-arrow-offset", a - l + "px");
      }), e(this, "setScrubbingContainerSize", () => {
        const {
          width: e,
          height: t
        } = et(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight
        });
        this.elements.scrubbing.container.style.width = `${e}px`, this.elements.scrubbing.container.style.height = `${t}px`;
      }), e(this, "setImageSizeAndOffset", (e, t) => {
        if (!this.usingSprites) return;
        const i = this.thumbContainerHeight / t.h;
        e.style.height = e.naturalHeight * i + "px", e.style.width = e.naturalWidth * i + "px", e.style.left = `-${t.x * i}px`, e.style.top = `-${t.y * i}px`;
      }), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
        thumb: {},
        scrubbing: {}
      }, this.load();
    }
    get enabled() {
      return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
    }
    get currentImageContainer() {
      return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
    }
    get usingSprites() {
      return Object.keys(this.thumbnails[0].frames[0]).includes("w");
    }
    get thumbAspectRatio() {
      return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
    }
    get thumbContainerHeight() {
      if (this.mouseDown) {
        const {
          height: e
        } = et(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight
        });
        return e;
      }
      return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
    }
    get currentImageElement() {
      return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
    }
    set currentImageElement(e) {
      this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
    }
  }
  const it = {
    insertElements(e, t) {
      S.string(t) ? _(e, this.media, {
        src: t
      }) : S.array(t) && t.forEach(t => {
        _(e, this.media, t);
      });
    },
    change(e) {
      N(e, "sources.length") ? (de.cancelRequests.call(this), this.destroy.call(this, () => {
        this.options.quality = [], O(this.media), this.media = null, S.element(this.elements.container) && this.elements.container.removeAttribute("class");
        const {
            sources: t,
            type: i
          } = e,
          [{
            provider: s = _e.html5,
            src: n
          }] = t,
          a = "html5" === s ? i : "div",
          l = "html5" === s ? {} : {
            src: n
          };
        Object.assign(this, {
          provider: s,
          type: i,
          supported: K.check(i, s, this.config.playsinline),
          media: $(a, l)
        }), this.elements.container.appendChild(this.media), S.boolean(e.autoplay) && (this.config.autoplay = e.autoplay), this.isHTML5 && (this.config.crossorigin && this.media.setAttribute("crossorigin", ""), this.config.autoplay && this.media.setAttribute("autoplay", ""), S.empty(e.poster) || (this.poster = e.poster), this.config.loop.active && this.media.setAttribute("loop", ""), this.config.muted && this.media.setAttribute("muted", ""), this.config.playsinline && this.media.setAttribute("playsinline", "")), Fe.addStyleHook.call(this), this.isHTML5 && it.insertElements.call(this, "source", t), this.config.title = e.title, Xe.setup.call(this), this.isHTML5 && Object.keys(e).includes("tracks") && it.insertElements.call(this, "track", e.tracks), (this.isHTML5 || this.isEmbed && !this.supported.ui) && Fe.build.call(this), this.isHTML5 && this.media.load(), S.empty(e.previewThumbnails) || (Object.assign(this.config.previewThumbnails, e.previewThumbnails), this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), this.config.previewThumbnails.enabled && (this.previewThumbnails = new tt(this))), this.fullscreen.update();
      }, !0)) : this.debug.warn("Invalid source format");
    }
  };
  class st {
    constructor(t, i) {
      if (e(this, "play", () => S.function(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(() => this.ads.play()).catch(() => ie(this.media.play())), this.media.play()) : null), e(this, "pause", () => this.playing && S.function(this.media.pause) ? this.media.pause() : null), e(this, "togglePlay", e => (S.boolean(e) ? e : !this.playing) ? this.play() : this.pause()), e(this, "stop", () => {
        this.isHTML5 ? (this.pause(), this.restart()) : S.function(this.media.stop) && this.media.stop();
      }), e(this, "restart", () => {
        this.currentTime = 0;
      }), e(this, "rewind", e => {
        this.currentTime -= S.number(e) ? e : this.config.seekTime;
      }), e(this, "forward", e => {
        this.currentTime += S.number(e) ? e : this.config.seekTime;
      }), e(this, "increaseVolume", e => {
        const t = this.media.muted ? 0 : this.volume;
        this.volume = t + (S.number(e) ? e : 0);
      }), e(this, "decreaseVolume", e => {
        this.increaseVolume(-e);
      }), e(this, "airplay", () => {
        K.airplay && this.media.webkitShowPlaybackTargetPicker();
      }), e(this, "toggleControls", e => {
        if (this.supported.ui && !this.isAudio) {
          const t = F(this.elements.container, this.config.classNames.hideControls),
            i = void 0 === e ? void 0 : !e,
            s = R(this.elements.container, this.config.classNames.hideControls, i);
          if (s && S.array(this.config.controls) && this.config.controls.includes("settings") && !S.empty(this.config.settings) && Pe.toggleMenu.call(this, !1), s !== t) {
            const e = s ? "controlshidden" : "controlsshown";
            Z.call(this, this.media, e);
          }
          return !s;
        }
        return !1;
      }), e(this, "on", (e, t) => {
        X.call(this, this.elements.container, e, t);
      }), e(this, "once", (e, t) => {
        G.call(this, this.elements.container, e, t);
      }), e(this, "off", (e, t) => {
        J(this.elements.container, e, t);
      }), e(this, "destroy", (e, t = !1) => {
        if (!this.ready) return;
        const i = () => {
          document.body.style.overflow = "", this.embed = null, t ? (Object.keys(this.elements).length && (O(this.elements.buttons.play), O(this.elements.captions), O(this.elements.controls), O(this.elements.wrapper), this.elements.buttons.play = null, this.elements.captions = null, this.elements.controls = null, this.elements.wrapper = null), S.function(e) && e()) : (ee.call(this), de.cancelRequests.call(this), q(this.elements.original, this.elements.container), Z.call(this, this.elements.original, "destroyed", !0), S.function(e) && e.call(this.elements.original), this.ready = !1, setTimeout(() => {
            this.elements = null, this.media = null;
          }, 200));
        };
        this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (Fe.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && S.function(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200));
      }), e(this, "supports", e => K.mime.call(this, e)), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = K.touch, this.media = t, S.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || S.nodeList(this.media) || S.array(this.media)) && (this.media = this.media[0]), this.config = x({}, Le, st.defaults, i || {}, (() => {
        try {
          return JSON.parse(this.media.getAttribute("data-plyr-config"));
        } catch (e) {
          return {};
        }
      })()), this.elements = {
        container: null,
        fullscreen: null,
        captions: null,
        buttons: {},
        display: {},
        progress: {},
        inputs: {},
        settings: {
          popup: null,
          menu: null,
          panels: {},
          buttons: {}
        }
      }, this.captions = {
        active: null,
        currentTrack: -1,
        meta: new WeakMap()
      }, this.fullscreen = {
        active: !1
      }, this.options = {
        speed: [],
        quality: []
      }, this.debug = new De(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", K), S.nullOrUndefined(this.media) || !S.element(this.media)) return void this.debug.error("Setup failed: no suitable element passed");
      if (this.media.plyr) return void this.debug.warn("Target already setup");
      if (!this.config.enabled) return void this.debug.error("Setup failed: disabled by config");
      if (!K.check().api) return void this.debug.error("Setup failed: no support");
      const s = this.media.cloneNode(!0);
      s.autoplay = !1, this.elements.original = s;
      const n = this.media.tagName.toLowerCase();
      let a = null,
        l = null;
      switch (n) {
        case "div":
          if (a = this.media.querySelector("iframe"), S.element(a)) {
            if (l = Me(a.getAttribute("src")), this.provider = function (e) {
              return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? _e.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? _e.vimeo : null;
            }(l.toString()), this.elements.container = this.media, this.media = a, this.elements.container.className = "", l.search.length) {
              const e = ["1", "true"];
              e.includes(l.searchParams.get("autoplay")) && (this.config.autoplay = !0), e.includes(l.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = e.includes(l.searchParams.get("playsinline")), this.config.youtube.hl = l.searchParams.get("hl")) : this.config.playsinline = !0;
            }
          } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
          if (S.empty(this.provider) || !Object.values(_e).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
          this.type = je;
          break;
        case "video":
        case "audio":
          this.type = n, this.provider = _e.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
          break;
        default:
          return void this.debug.error("Setup failed: unsupported type");
      }
      this.supported = K.check(this.type, this.provider), this.supported.api ? (this.eventListeners = [], this.listeners = new Ve(this), this.storage = new we(this), this.media.plyr = this, S.element(this.elements.container) || (this.elements.container = $("div"), L(this.media, this.elements.container)), Fe.migrateStyles.call(this), Fe.addStyleHook.call(this), Xe.setup.call(this), this.config.debug && X.call(this, this.elements.container, this.config.events.join(" "), e => {
        this.debug.log(`event: ${e.type}`);
      }), this.fullscreen = new He(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && Fe.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new Je(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", () => ie(this.play())), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new tt(this))) : this.debug.error("Setup failed: no support");
    }
    get isHTML5() {
      return this.provider === _e.html5;
    }
    get isEmbed() {
      return this.isYouTube || this.isVimeo;
    }
    get isYouTube() {
      return this.provider === _e.youtube;
    }
    get isVimeo() {
      return this.provider === _e.vimeo;
    }
    get isVideo() {
      return this.type === je;
    }
    get isAudio() {
      return this.type === Oe;
    }
    get playing() {
      return Boolean(this.ready && !this.paused && !this.ended);
    }
    get paused() {
      return Boolean(this.media.paused);
    }
    get stopped() {
      return Boolean(this.paused && 0 === this.currentTime);
    }
    get ended() {
      return Boolean(this.media.ended);
    }
    set currentTime(e) {
      if (!this.duration) return;
      const t = S.number(e) && e > 0;
      this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log(`Seeking to ${this.currentTime} seconds`);
    }
    get currentTime() {
      return Number(this.media.currentTime);
    }
    get buffered() {
      const {
        buffered: e
      } = this.media;
      return S.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
    }
    get seeking() {
      return Boolean(this.media.seeking);
    }
    get duration() {
      const e = parseFloat(this.config.duration),
        t = (this.media || {}).duration,
        i = S.number(t) && t !== 1 / 0 ? t : 0;
      return e || i;
    }
    set volume(e) {
      let t = e;
      S.string(t) && (t = Number(t)), S.number(t) || (t = this.storage.get("volume")), S.number(t) || ({
        volume: t
      } = this.config), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !S.empty(e) && this.muted && t > 0 && (this.muted = !1);
    }
    get volume() {
      return Number(this.media.volume);
    }
    set muted(e) {
      let t = e;
      S.boolean(t) || (t = this.storage.get("muted")), S.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
    }
    get muted() {
      return Boolean(this.media.muted);
    }
    get hasAudio() {
      return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
    }
    set speed(e) {
      let t = null;
      S.number(e) && (t = e), S.number(t) || (t = this.storage.get("speed")), S.number(t) || (t = this.config.speed.selected);
      const {
        minimumSpeed: i,
        maximumSpeed: s
      } = this;
      t = Ge(t, i, s), this.config.speed.selected = t, setTimeout(() => {
        this.media && (this.media.playbackRate = t);
      }, 0);
    }
    get speed() {
      return Number(this.media.playbackRate);
    }
    get minimumSpeed() {
      return this.isYouTube ? Math.min(...this.options.speed) : this.isVimeo ? .5 : .0625;
    }
    get maximumSpeed() {
      return this.isYouTube ? Math.max(...this.options.speed) : this.isVimeo ? 2 : 16;
    }
    set quality(e) {
      const t = this.config.quality,
        i = this.options.quality;
      if (!i.length) return;
      let s = [!S.empty(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(S.number),
        n = !0;
      if (!i.includes(s)) {
        const e = ne(i, s);
        this.debug.warn(`Unsupported quality option: ${s}, using ${e} instead`), s = e, n = !1;
      }
      t.selected = s, this.media.quality = s, n && this.storage.set({
        quality: s
      });
    }
    get quality() {
      return this.media.quality;
    }
    set loop(e) {
      const t = S.boolean(e) ? e : this.config.loop.active;
      this.config.loop.active = t, this.media.loop = t;
    }
    get loop() {
      return Boolean(this.media.loop);
    }
    set source(e) {
      it.change.call(this, e);
    }
    get source() {
      return this.media.currentSrc;
    }
    get download() {
      const {
        download: e
      } = this.config.urls;
      return S.url(e) ? e : this.source;
    }
    set download(e) {
      S.url(e) && (this.config.urls.download = e, Pe.setDownloadUrl.call(this));
    }
    set poster(e) {
      this.isVideo ? Fe.setPoster.call(this, e, !1).catch(() => {}) : this.debug.warn("Poster can only be set for video");
    }
    get poster() {
      return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null;
    }
    get ratio() {
      if (!this.isVideo) return null;
      const e = oe(ce.call(this));
      return S.array(e) ? e.join(":") : e;
    }
    set ratio(e) {
      this.isVideo ? S.string(e) && re(e) ? (this.config.ratio = oe(e), ue.call(this)) : this.debug.error(`Invalid aspect ratio specified (${e})`) : this.debug.warn("Aspect ratio can only be set for video");
    }
    set autoplay(e) {
      this.config.autoplay = S.boolean(e) ? e : this.config.autoplay;
    }
    get autoplay() {
      return Boolean(this.config.autoplay);
    }
    toggleCaptions(e) {
      xe.toggle.call(this, e, !1);
    }
    set currentTrack(e) {
      xe.set.call(this, e, !1), xe.setup.call(this);
    }
    get currentTrack() {
      const {
        toggled: e,
        currentTrack: t
      } = this.captions;
      return e ? t : -1;
    }
    set language(e) {
      xe.setLanguage.call(this, e, !1);
    }
    get language() {
      return (xe.getCurrentTrack.call(this) || {}).language;
    }
    set pip(e) {
      if (!K.pip) return;
      const t = S.boolean(e) ? e : !this.pip;
      S.function(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? Ie : $e), S.function(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
    }
    get pip() {
      return K.pip ? S.empty(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Ie : null;
    }
    setPreviewThumbnails(e) {
      this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), Object.assign(this.config.previewThumbnails, e), this.config.previewThumbnails.enabled && (this.previewThumbnails = new tt(this));
    }
    static supported(e, t) {
      return K.check(e, t);
    }
    static loadSprite(e, t) {
      return ke(e, t);
    }
    static setup(e, t = {}) {
      let i = null;
      return S.string(e) ? i = Array.from(document.querySelectorAll(e)) : S.nodeList(e) ? i = Array.from(e) : S.array(e) && (i = e.filter(S.element)), S.empty(i) ? null : i.map(e => new st(e, t));
    }
  }
  var nt;
  return st.defaults = (nt = Le, JSON.parse(JSON.stringify(nt))), st;
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/in-view/dist/in-view.min.js
var in_view_min = __webpack_require__(138);
var in_view_min_default = /*#__PURE__*/__webpack_require__.n(in_view_min);
// EXTERNAL MODULE: ./node_modules/imagesloaded/imagesloaded.js
var imagesloaded = __webpack_require__(70);
var imagesloaded_default = /*#__PURE__*/__webpack_require__.n(imagesloaded);
;// CONCATENATED MODULE: ./node_modules/gsap/gsap-core.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/*!
 * GSAP 3.11.3
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  },
  _defaults = {
    duration: .5,
    overwrite: false,
    delay: 0
  },
  _suppressOverwrites,
  _reverting,
  _context,
  _bigNum = 1e8,
  _tinyNum = 1 / _bigNum,
  _2PI = Math.PI * 2,
  _HALF_PI = _2PI / 4,
  _gsID = 0,
  _sqrt = Math.sqrt,
  _cos = Math.cos,
  _sin = Math.sin,
  _isString = function _isString(value) {
    return typeof value === "string";
  },
  _isFunction = function _isFunction(value) {
    return typeof value === "function";
  },
  _isNumber = function _isNumber(value) {
    return typeof value === "number";
  },
  _isUndefined = function _isUndefined(value) {
    return typeof value === "undefined";
  },
  _isObject = function _isObject(value) {
    return typeof value === "object";
  },
  _isNotFalse = function _isNotFalse(value) {
    return value !== false;
  },
  _windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
  _isFuncOrString = function _isFuncOrString(value) {
    return _isFunction(value) || _isString(value);
  },
  _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
  // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
  _isArray = Array.isArray,
  _strictNumExp = /(?:-?\.?\d|\.)+/gi,
  //only numbers (including negatives and decimals) but NOT relative values.
  _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
  _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
  _relExp = /[+-]=-?[.\d]+/,
  _delimitedValueExp = /[^,'"\[\]\s]+/gi,
  // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
  _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
  _globalTimeline,
  _win,
  _coreInitted,
  _doc,
  _globals = {},
  _installScope = {},
  _coreReady,
  _install = function _install(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  },
  _missingPlugin = function _missingPlugin(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  },
  _warn = function _warn(message, suppress) {
    return !suppress && console.warn(message);
  },
  _addGlobal = function _addGlobal(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  },
  _emptyFunc = function _emptyFunc() {
    return 0;
  },
  _startAtRevertConfig = {
    suppressEvents: true,
    isStart: true,
    kill: false
  },
  _revertConfigNoKill = {
    suppressEvents: true,
    kill: false
  },
  _revertConfig = {
    suppressEvents: true
  },
  _reservedProps = {},
  _lazyTweens = [],
  _lazyLookup = {},
  _lastRenderedFrame,
  _plugins = {},
  _effects = {},
  _nextGCFrame = 30,
  _harnessPlugins = [],
  _callbackNames = "",
  _harness = function _harness(targets) {
    var target = targets[0],
      harnessPlugin,
      i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
      i = _harnessPlugins.length;
      while (i-- && !_harnessPlugins[i].targetTest(target)) {}
      harnessPlugin = _harnessPlugins[i];
    }
    i = targets.length;
    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }
    return targets;
  },
  _getCache = function _getCache(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  },
  _getProperty = function _getProperty(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  },
  _forEachName = function _forEachName(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  },
  //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
  _round = function _round(value) {
    return Math.round(value * 100000) / 100000 || 0;
  },
  _roundPrecise = function _roundPrecise(value) {
    return Math.round(value * 10000000) / 10000000 || 0;
  },
  // increased precision mostly for timing values.
  _parseRelative = function _parseRelative(start, value) {
    var operator = value.charAt(0),
      end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
  },
  _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
    //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
    var l = toFind.length,
      i = 0;
    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}
    return i < l;
  },
  _lazyRender = function _lazyRender() {
    var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;
    _lazyLookup = {};
    _lazyTweens.length = 0;
    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  },
  _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
    _lazyTweens.length && _lazyRender();
    animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
    _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
  },
  _numericIfPossible = function _numericIfPossible(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  },
  _passThrough = function _passThrough(p) {
    return p;
  },
  _setDefaults = function _setDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || (obj[p] = defaults[p]);
    }
    return obj;
  },
  _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
    return function (obj, defaults) {
      for (var p in defaults) {
        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
      }
    };
  },
  _merge = function _merge(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }
    return base;
  },
  _mergeDeep = function _mergeDeep(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }
    return base;
  },
  _copyExcluding = function _copyExcluding(obj, excluding) {
    var copy = {},
      p;
    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }
    return copy;
  },
  _inheritDefaults = function _inheritDefaults(vars) {
    var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }
    return vars;
  },
  _arraysMatch = function _arraysMatch(a1, a2) {
    var i = a1.length,
      match = i === a2.length;
    while (match && i-- && a1[i] === a2[i]) {}
    return i < 0;
  },
  _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = parent[lastProp],
      t;
    if (sortBy) {
      t = child[sortBy];
      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }
    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  },
  _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = child._prev,
      next = child._next;
    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }
    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }
    child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
  },
  _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
    child._act = 0;
  },
  _uncache = function _uncache(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
      var a = animation;
      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }
    return animation;
  },
  _recacheAncestors = function _recacheAncestors(animation) {
    var parent = animation.parent;
    while (parent && parent.parent) {
      //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }
    return animation;
  },
  _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
    return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
  },
  _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
  },
  _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  },
  // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
  _animationCycle = function _animationCycle(tTime, cycleDuration) {
    var whole = Math.floor(tTime /= cycleDuration);
    return tTime && whole === tTime ? whole - 1 : whole;
  },
  _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  },
  _setEnd = function _setEnd(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  },
  _alignPlayhead = function _alignPlayhead(animation, totalTime) {
    // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
      _setEnd(animation);
      parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
    }

    return animation;
  },
  /*
  _totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
  	let cycleDuration = duration + repeatDelay,
  		time = _round(clampedTotalTime % cycleDuration);
  	if (time > duration) {
  		time = duration;
  	}
  	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
  },
  */
  _postAddChecks = function _postAddChecks(timeline, child) {
    var t;
    if (child._time || child._initted && !child._dur) {
      //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
      t = _parentToChildTotalTime(timeline.rawTime(), child);
      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.

    if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
      //in case any of the ancestors had completed but should now be enabled...
      if (timeline._dur < timeline.duration()) {
        t = timeline;
        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

          t = t._dp;
        }
      }
      timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
    }
  },
  _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);
    _isFromOrFromStart(child) || (timeline._recent = child);
    skipChecks || _postAddChecks(timeline, child);
    timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime); // if the timeline is reversed and the new child makes it longer, we may need to adjust the parent's _start (push it back)

    return timeline;
  },
  _scrollTrigger = function _scrollTrigger(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  },
  _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
    _initTween(tween, time, tTime);
    if (!tween._initted) {
      return 1;
    }
    if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);
      tween._lazy = [tTime, suppressEvents];
      return 1;
    }
  },
  _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
  },
  // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
  _isFromOrFromStart = function _isFromOrFromStart(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  },
  _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
      repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;
    if (repeatDelay && tween._repeat) {
      // in case there's a zero-duration tween that has a repeat with a repeatDelay
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
        // if iteration changed
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }
    if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
        // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
        return;
      }
      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

      suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);
        if (!suppressEvents && !_reverting) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  },
  _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
      child = animation._first;
      while (child && child._start <= time) {
        if (child.data === "isPause" && child._start > prevTime) {
          return child;
        }
        child = child._next;
      }
    } else {
      child = animation._last;
      while (child && child._start >= time) {
        if (child.data === "isPause" && child._start < prevTime) {
          return child;
        }
        child = child._prev;
      }
    }
  },
  _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat,
      dur = _roundPrecise(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
    animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  },
  _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  },
  _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  },
  _parsePosition = function _parsePosition(animation, position, percentAnimation) {
    var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
      i,
      offset,
      isPercent;
    if (_isString(position) && (isNaN(position) || position in labels)) {
      //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");
      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }
      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }
      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }
      return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
  },
  _createTweenType = function _createTweenType(type, params, timeline) {
    var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars,
      parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline;
    if (type) {
      irVars = vars;
      parent = timeline;
      while (parent && !("immediateRender" in irVars)) {
        // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }
      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
    }

    return new Tween(params[0], vars, params[varsIndex + 1]);
  },
  _conditionalReturn = function _conditionalReturn(value, func) {
    return value || value === 0 ? func(value) : func;
  },
  _clamp = function _clamp(min, max, value) {
    return value < min ? min : value > max ? max : value;
  },
  getUnit = function getUnit(value, v) {
    return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
  },
  // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
  clamp = function clamp(min, max, value) {
    return _conditionalReturn(value, function (v) {
      return _clamp(min, max, v);
    });
  },
  _slice = [].slice,
  _isArrayLike = function _isArrayLike(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  },
  _flatten = function _flatten(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }
    return ar.forEach(function (value) {
      var _accumulator;
      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  },
  //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
  toArray = function toArray(value, scope, leaveStrings) {
    return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  },
  selector = function selector(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function (v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  },
  shuffle = function shuffle(a) {
    return a.sort(function () {
      return .5 - Math.random();
    });
  },
  // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
  //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
  distribute = function distribute(v) {
    if (_isFunction(v)) {
      return v;
    }
    var vars = _isObject(v) ? v : {
        each: v
      },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
      ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;
    if (_isString(from)) {
      ratioX = ratioY = {
        center: .5,
        edges: .5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }
    return function (i, target, a) {
      var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;
      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
        if (!wrapAt) {
          max = -_bigNum;
          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}
          wrapAt--;
        }
        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
        originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;
        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }
        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0; //unit

        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }
      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
    };
  },
  _roundModifier = function _roundModifier(v) {
    //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

    return function (raw) {
      var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
    };
  },
  snap = function snap(snapTo, value) {
    var isArray = _isArray(snapTo),
      radius,
      is2D;
    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;
      if (snapTo.values) {
        snapTo = toArray(snapTo.values);
        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }
    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function (raw) {
      var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;
      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }
        if (dx < min) {
          min = dx;
          closest = i;
        }
      }
      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  },
  random = function random(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  },
  pipe = function pipe() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function (value) {
      return functions.reduce(function (v, f) {
        return f(v);
      }, value);
    };
  },
  unitize = function unitize(func, unit) {
    return function (value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  },
  normalize = function normalize(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  },
  _wrapArray = function _wrapArray(a, wrapper, value) {
    return _conditionalReturn(value, function (index) {
      return a[~~wrapper(index)];
    });
  },
  wrap = function wrap(min, max, value) {
    // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
      return (range + (value - min) % range) % range + min;
    });
  },
  wrapYoyo = function wrapYoyo(min, max, value) {
    var range = max - min,
      total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
      value = (total + (value - min) % total) % total || 0;
      return min + (value > range ? total - value : value);
    });
  },
  _replaceRandom = function _replaceRandom(value) {
    //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
    var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;
    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
  },
  mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin,
      outRange = outMax - outMin;
    return _conditionalReturn(value, function (value) {
      return outMin + ((value - inMin) / inRange * outRange || 0);
    });
  },
  interpolate = function interpolate(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function (p) {
      return (1 - p) * start + p * end;
    };
    if (!func) {
      var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;
      progress === true && (mutate = 1) && (progress = null);
      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;
        for (i = 1; i < l; i++) {
          interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
        }

        l--;
        func = function func(p) {
          p *= l;
          var i = Math.min(il, ~~p);
          return interpolators[i](p - i);
        };
        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }
      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }
        func = function func(p) {
          return _renderPropTweens(p, master) || (isString ? start.p : start);
        };
      }
    }
    return _conditionalReturn(progress, func);
  },
  _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
    //used for nextLabel() and previousLabel()
    var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;
    for (p in labels) {
      distance = labels[p] - fromTime;
      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }
    return label;
  },
  _callback = function _callback(animation, type, executeLazyFirst) {
    var v = animation.vars,
      callback = v[type],
      prevContext = _context,
      context = animation._ctx,
      params,
      scope,
      result;
    if (!callback) {
      return;
    }
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

    context && (_context = context);
    result = params ? callback.apply(scope, params) : callback.call(scope);
    _context = prevContext;
    return result;
  },
  _interrupt = function _interrupt(animation) {
    _removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  },
  _quickTween,
  _createPlugin = function _createPlugin(config) {
    config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

    var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
        this._props = [];
      } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
      instanceDefaults = {
        init: _emptyFunc,
        render: _renderPropTweens,
        add: _addPropTween,
        kill: _killPropTweensOf,
        modifier: _addPluginModifier,
        rawVars: 0
      },
      statics = {
        targetTest: 0,
        get: 0,
        getSetter: _getSetter,
        aliases: {},
        register: 0
      };
    _wake();
    if (config !== Plugin) {
      if (_plugins[name]) {
        return;
      }
      _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods

      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods

      _plugins[Plugin.prop = name] = Plugin;
      if (config.targetTest) {
        _harnessPlugins.push(Plugin);
        _reservedProps[name] = 1;
      }
      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
    }

    _addGlobal(name, Plugin);
    config.register && config.register(gsap, Plugin, PropTween);
  },
  /*
   * --------------------------------------------------------------------------------------
   * COLORS
   * --------------------------------------------------------------------------------------
   */
  _255 = 255,
  _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  },
  // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
  // let ctx = _doc.createElement("canvas").getContext("2d");
  // _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
  _hue = function _hue(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
  },
  splitColor = function splitColor(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;
    if (!a) {
      if (v.substr(-1) === ",") {
        //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          //for shorthand like #9F0 or #9F0F (could have alpha)
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }
        if (v.length === 9) {
          // hex with alpha, like #fd5e53ff
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);
        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= .5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1); //cast as number

          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          //if relative values are found, just return the raw strings with the relative prefixes in place.
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }
      a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = ~~(h + .5);
      a[1] = ~~(s * 100 + .5);
      a[2] = ~~(l * 100 + .5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  },
  _colorOrderData = function _colorOrderData(v) {
    // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
    var values = [],
      c = [],
      i = -1;
    v.split(_colorExp).forEach(function (v) {
      var a = v.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  },
  _formatColors = function _formatColors(s, toHSL, orderMatchData) {
    var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;
    if (!colors) {
      return s;
    }
    colors = colors.map(function (color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;
      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }
    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }
    return result + shell[l];
  },
  _colorExp = function () {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
      p;
    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }
    return new RegExp(s + ")", "gi");
  }(),
  _hslExp = /hsl[a]?\(/,
  _colorStringFilter = function _colorStringFilter(a) {
    var combined = a.join(" "),
      toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

      return true;
    }
  },
  /*
   * --------------------------------------------------------------------------------------
   * TICKER
   * --------------------------------------------------------------------------------------
   */
  _tickerActive,
  _ticker = function () {
    var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
        var elapsed = _getTime() - _lastUpdate,
          manual = v === true,
          overlap,
          dispatch,
          time,
          frame;
        elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
        _lastUpdate += elapsed;
        time = _lastUpdate - _startTime;
        overlap = time - _nextTime;
        if (overlap > 0 || manual) {
          frame = ++_self.frame;
          _delta = time - _self.time * 1000;
          _self.time = time = time / 1000;
          _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
          dispatch = 1;
        }
        manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

        if (dispatch) {
          for (_i = 0; _i < _listeners.length; _i++) {
            // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
            _listeners[_i](time, _delta, frame, v);
          }
        }
      };
    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1000 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
            _raf = _win.requestAnimationFrame;
          }
          _id && _self.sleep();
          _req = _raf || function (f) {
            return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
          };
          _tickerActive = 1;
          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

        _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
      },
      fps: function fps(_fps) {
        _gap = 1000 / (_fps || 240);
        _nextTime = _self.time * 1000 + _gap;
      },
      add: function add(callback, once, prioritize) {
        var func = once ? function (t, d, f, v) {
          callback(t, d, f, v);
          _self.remove(func);
        } : callback;
        _self.remove(callback);
        _listeners[prioritize ? "unshift" : "push"](func);
        _wake();
        return func;
      },
      remove: function remove(callback, i) {
        ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
      },
      _listeners: _listeners
    };
    return _self;
  }(),
  _wake = function _wake() {
    return !_tickerActive && _ticker.wake();
  },
  //also ensures the core classes are initialized.

  /*
  * -------------------------------------------------
  * EASING
  * -------------------------------------------------
  */
  _easeMap = {},
  _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
  _quotesExp = /["']/g,
  _parseObjectInString = function _parseObjectInString(value) {
    //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
    var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;
    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }
    return obj;
  },
  _valueInParentheses = function _valueInParentheses(value) {
    var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  },
  _configEaseFromString = function _configEaseFromString(name) {
    //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
    var split = (name + "").split("("),
      ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  },
  _invertEase = function _invertEase(ease) {
    return function (p) {
      return 1 - ease(1 - p);
    };
  },
  // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
  _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
    var child = timeline._first,
      ease;
    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }
      child = child._next;
    }
  },
  _parseEase = function _parseEase(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  },
  _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut(p) {
        return 1 - easeIn(1 - p);
      };
    }
    if (easeInOut === void 0) {
      easeInOut = function easeInOut(p) {
        return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }
    var ease = {
        easeIn: easeIn,
        easeOut: easeOut,
        easeInOut: easeInOut
      },
      lowercaseName;
    _forEachName(names, function (name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });
    return ease;
  },
  _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
    return function (p) {
      return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
    };
  },
  _configElastic = function _configElastic(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
      p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
        return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
      },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
        return 1 - easeOut(1 - p);
      } : _easeInOutFromOut(easeOut);
    p2 = _2PI / p2; //precalculate to optimize

    ease.config = function (amplitude, period) {
      return _configElastic(type, amplitude, period);
    };
    return ease;
  },
  _configBack = function _configBack(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }
    var easeOut = function easeOut(p) {
        return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
      },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
        return 1 - easeOut(1 - p);
      } : _easeInOutFromOut(easeOut);
    ease.config = function (overshoot) {
      return _configBack(type, overshoot);
    };
    return ease;
  }; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };

_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;
  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});
_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
(function (n, c) {
  var n1 = 1 / c,
    n2 = 2 * n1,
    n3 = 2.5 * n1,
    easeOut = function easeOut(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
    };
  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);
_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});
_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});
_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});
_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }
    var p1 = 1 / steps,
      p2 = steps + (immediateStart ? 0 : 1),
      p3 = immediateStart ? 1 : 0,
      max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];
_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */

var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */

var Animation = /*#__PURE__*/function () {
  function Animation(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;
    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }
    this._ts = 1;
    _setDuration(this, +vars.duration, 1, 1);
    this.data = vars.data;
    if (_context) {
      this._ctx = _context;
      _context.data.push(this);
    }
    _tickerActive || _ticker.wake();
  }
  var _proto = Animation.prototype;
  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }
    return this._delay;
  };
  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };
  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }
    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };
  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();
    if (!arguments.length) {
      return this._tTime;
    }
    var parent = this._dp;
    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);
      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }
        parent = parent.parent;
      }
      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }
    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
      //   this._lock = 1;

      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
      //}
    }

    return this;
  };
  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };
  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };
  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }
    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    this.totalTime(_clamp(-this._delay, this._tDur, tTime), true);
    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.

    return _recacheAncestors(this);
  };
  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }
    if (this._ps !== value) {
      this._ps = value;
      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();
        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };
  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }
    return this._start;
  };
  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };
  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detached parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };
  _proto.revert = function revert(config) {
    if (config === void 0) {
      config = _revertConfig;
    }
    var prevIsReverting = _reverting;
    _reverting = config;
    if (this._initted || this._startAt) {
      this.timeline && this.timeline.revert(config);
      this.totalTime(-0.01, config.suppressEvents);
    }
    this.data !== "nested" && config.kill !== false && this.kill();
    _reverting = prevIsReverting;
    return this;
  };
  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
      time = arguments.length ? rawTime : animation.rawTime();
    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }
    return !this.parent && this.vars.immediateRender ? -1 : time; // the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for Recording.revert())
  };

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }
    return this._repeat === -2 ? Infinity : this._repeat;
  };
  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;
      _onUpdateTotalDuration(this);
      return time ? this.time(time) : this;
    }
    return this._rDelay;
  };
  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }
    return this._yoyo;
  };
  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };
  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };
  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };
  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };
  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };
  _proto.resume = function resume() {
    return this.paused(false);
  };
  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }
    return this._rts < 0;
  };
  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };
  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
      start = this._start,
      rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };
  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;
    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }
      return this;
    }
    return vars[type];
  };
  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
        _resolve = function _resolve() {
          var _then = self.then;
          self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };
      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };
  _proto.kill = function kill() {
    _interrupt(this);
  };
  return Animation;
}();
_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */

var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);
  function Timeline(vars, position) {
    var _this;
    if (vars === void 0) {
      vars = {};
    }
    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }
  var _proto2 = Timeline.prototype;
  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);
    return this;
  };
  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);
    return this;
  };
  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);
    return this;
  };
  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };
  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };
  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
      tDur = this._dirty ? this.totalDuration() : this._tDur,
      dur = this._dur,
      tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
      // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
      crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
      time,
      child,
      next,
      iteration,
      cycleDuration,
      prevPaused,
      pauseTween,
      timeScale,
      prevStart,
      prevIteration,
      yoyo,
      isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }
      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;
      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }
      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);
          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */

        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
            doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
            return this;
          }
          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;
          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }
          this._lock = 0;
          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.

          _propagateYoyoEase(this, isYoyo);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }
      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
      }

      if (!prevTime && time && !suppressEvents) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }
      if (time >= prevTime && totalTime >= 0) {
        child = this._first;
        while (child) {
          next = child._next;
          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }
          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;
          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt)); // if reverting, we should always force renders of initted tweens (but remember that .fromTo() or .from() may have a _startAt but not _initted yet). If, for example, a .fromTo() tween with a stagger (which creates an internal timeline) gets reverted BEFORE some of its child tweens render for the first time, it may not properly trigger them to revert.

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }
          child = next;
        }
      }
      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
          _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }
    return this;
  };
  _proto2.add = function add(child, position) {
    var _this2 = this;
    _isNumber(position) || (position = _parsePosition(this, position, child));
    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }
      if (_isString(child)) {
        return this.addLabel(child, position);
      }
      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }
    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }
    if (tweens === void 0) {
      tweens = true;
    }
    if (timelines === void 0) {
      timelines = true;
    }
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }
    var a = [],
      child = this._first;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }
      child = child._next;
    }
    return a;
  };
  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
      i = animations.length;
    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };
  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }
    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }
    _removeLinkedListItem(this, child);
    if (child === this._recent) {
      this._recent = this._last;
    }
    return _uncache(this);
  };
  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }
    this._forcing = 1;
    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }
    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
    this._forcing = 0;
    return this;
  };
  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };
  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };
  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };
  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);
    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }
      child = child._next;
    }
  };
  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
      i = tweens.length;
    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }
    return this;
  };
  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
      parsedTargets = toArray(targets),
      child = this._first,
      isGlobalTime = _isNumber(onlyActive),
      // a number is interpreted as a global time. If the animation spans
      children;
    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }
      child = child._next;
    }
    return a;
  } // potential future feature - targets() on timelines
  // targets() {
  // 	let result = [];
  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
  // 	return result.filter((v, i) => result.indexOf(v) === i);
  // }
  ;

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};
    var tl = this,
      endTime = _parsePosition(tl, position),
      _vars = vars,
      startAt = _vars.startAt,
      _onStart = _vars.onStart,
      onStartParams = _vars.onStartParams,
      immediateRender = _vars.immediateRender,
      initted,
      tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }
          _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
        }
      }, vars));
    return immediateRender ? tween.render(0) : tween;
  };
  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };
  _proto2.recent = function recent() {
    return this._recent;
  };
  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };
  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };
  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };
  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }
    var child = this._first,
      labels = this.labels,
      p;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }
      child = child._next;
    }
    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }
    return _uncache(this);
  };
  _proto2.invalidate = function invalidate(soft) {
    var child = this._first;
    this._lock = 0;
    while (child) {
      child.invalidate(soft);
      child = child._next;
    }
    return _Animation.prototype.invalidate.call(this, soft);
  };
  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }
    var child = this._first,
      next;
    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }
    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };
  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
      self = this,
      child = self._last,
      prevStart = _bigNum,
      prev,
      start,
      parent;
    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }
    if (self._dirty) {
      parent = self.parent;
      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;
        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }
        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;
          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }
          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }
        child._end > max && child._ts && (max = child._end);
        child = prev;
      }
      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
      self._dirty = 0;
    }
    return self._tDur;
  };
  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
      _lastRenderedFrame = _ticker.frame;
    }
    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }
        child || _ticker.sleep();
      }
    }
  };
  return Timeline;
}(Animation);
_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
    //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
    pt.b = start;
    pt.e = end;
    start += ""; //ensure values are strings

    end += "";
    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

      start = a[0];
      end = a[1];
    }
    startNums = start.match(_complexStringNumExp) || [];
    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }
      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

    pt.fp = funcParam;
    if (_relExp.test(end) || hasRandom) {
      pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
    }

    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

    return pt;
  },
  _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;
    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (end.charAt(1) === "=") {
        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
        if (pt || pt === 0) {
          // to avoid isNaN, like if someone passes in a value like "!= whatever"
          end = pt;
        }
      }
    }
    if (!optional || parsedStart !== end || _forceAllPropTweens) {
      if (!isNaN(parsedStart * end) && end !== "") {
        // fun fact: any number multiplied by "" is evaluated as the number 0!
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }
      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  },
  //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
  _processVars = function _processVars(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }
    var copy = {},
      p;
    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }
    return copy;
  },
  _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

        i = plugin._props.length;
        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }
    return plugin;
  },
  _overwritingTween,
  //store a reference temporarily so we can avoid overwriting itself.
  _forceAllPropTweens,
  _initTween = function _initTween(tween, time, tTime) {
    var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets,
      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
      //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

    if (!tl || keyframes && !vars.stagger) {
      //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

      cleanVars = _copyExcluding(vars, _reservedProps);
      if (prevStartAt) {
        prevStartAt._zTime < 0 && prevStartAt.progress(1); // in case it's a lazy startAt that hasn't rendered yet.

        time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig); // if it's a "startAt" (not "from()" or runBackwards: true), we only need to do a shallow revert (keep transforms cached in CSSPlugin)
        // don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.

        prevStartAt._lazy = 0;
      }
      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent: parent,
          immediateRender: true,
          lazy: _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate,
          onUpdateParams: onUpdateParams,
          callbackScope: callbackScope,
          stagger: 0
        }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);

        tween._startAt._dp = 0; // don't allow it to get put back into root timeline! Like when revert() is called and totalTime() gets set.

        time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

        if (immediateRender) {
          if (dur && time <= 0 && tTime <= 0) {
            // check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
            time && (tween._zTime = time);
            return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
          }
        }
      } else if (runBackwards && dur) {
        //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
        if (!prevStartAt) {
          time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
            lazy: immediateRender && _isNotFalse(lazy),
            immediateRender: immediateRender,
            //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
            stagger: 0,
            parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

          _removeFromParent(tween._startAt = Tween.set(targets, p));
          tween._startAt._dp = 0; // don't allow it to get put back into root timeline!

          time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
          tween._zTime = time;
          if (!immediateRender) {
            _initTween(tween._startAt, _tinyNum, _tinyNum); //ensures that the initial values are recorded
          } else if (!time) {
            return;
          }
        }
      }
      tween._pt = tween._ptCache = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

        index = fullTargets === targets ? i : fullTargets.indexOf(target);
        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
          plugin._props.forEach(function (name) {
            ptLookup[name] = pt;
          });
          plugin.priority && (hasPriority = 1);
        }
        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }
        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;
          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!

          overwritten = !tween.parent;
          _overwritingTween = 0;
        }
        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }
      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
    }

    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

    keyframes && time <= 0 && tl.render(_bigNum, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
  },
  _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
      pt,
      rootPT,
      lookup,
      i;
    if (!ptCache) {
      ptCache = tween._ptCache[property] = [];
      lookup = tween._ptLookup;
      i = tween._targets.length;
      while (i--) {
        pt = lookup[i][property];
        if (pt && pt.d && pt.d._pt) {
          // it's a plugin, so find the nested PropTween
          pt = pt.d._pt;
          while (pt && pt.p !== property && pt.fp !== property) {
            // "fp" is functionParam for things like setting CSS variables which require .setProperty("--var-name", value)
            pt = pt._next;
          }
        }
        if (!pt) {
          // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
          // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
          _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

          tween.vars[property] = "+=0";
          _initTween(tween, time);
          _forceAllPropTweens = 0;
          return 1;
        }
        ptCache.push(pt);
      }
    }
    i = ptCache.length;
    while (i--) {
      rootPT = ptCache[i];
      pt = rootPT._pt || rootPT; // complex values may have nested PropTweens. We only accommodate the FIRST value.

      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
      pt.c = value - pt.s;
      rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e)); // mainly for CSSPlugin (end value)

      rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b)); // (beginning value)
    }
  },
  _addAliasesToVars = function _addAliasesToVars(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;
    if (!propertyAliases) {
      return vars;
    }
    copy = _merge({}, vars);
    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }
    return copy;
  },
  // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
  _parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut",
      p,
      a;
    if (_isArray(obj)) {
      a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

      obj.forEach(function (value, i) {
        return a.push({
          t: i / (obj.length - 1) * 100,
          v: value,
          e: ease
        });
      });
    } else {
      for (p in obj) {
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
          t: parseFloat(prop),
          v: obj[p],
          e: ease
        });
      }
    }
  },
  _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  },
  _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
  _staggerPropsToSkip = {};
_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
  return _staggerPropsToSkip[name] = 1;
});
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */

var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);
  function Tween(targets, vars, position, skipInherit) {
    var _this3;
    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }
    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars,
      duration = _this3$vars.duration,
      delay = _this3$vars.delay,
      immediateRender = _this3$vars.immediateRender,
      stagger = _this3$vars.stagger,
      overwrite = _this3$vars.overwrite,
      keyframes = _this3$vars.keyframes,
      defaults = _this3$vars.defaults,
      scrollTrigger = _this3$vars.scrollTrigger,
      yoyoEase = _this3$vars.yoyoEase,
      parent = vars.parent || _globalTimeline,
      parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
      tl,
      i,
      copy,
      l,
      p,
      curTarget,
      staggerFunc,
      staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;
    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {},
        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
      }); // we need to store the targets because for staggers and keyframes, we end up creating an individual tween for each but function-based values need to know the index and the whole Array of targets.

      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;
      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);
        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }
        for (i = 0; i < l; i++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }
          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }
        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      } else if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));
        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0,
          a,
          kf,
          v;
        if (_isArray(keyframes)) {
          keyframes.forEach(function (frame) {
            return tl.to(parsedTargets, frame, ">");
          });
          tl.duration(); // to ensure tl._dur is cached because we tap into it for performance purposes in the render() method.
        } else {
          copy = {};
          for (p in keyframes) {
            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
          }
          for (p in copy) {
            a = copy[p].sort(function (a, b) {
              return a.t - b.t;
            });
            time = 0;
            for (i = 0; i < a.length; i++) {
              kf = a[i];
              v = {
                ease: kf.e,
                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
              };
              v[p] = kf.v;
              tl.to(parsedTargets, v, time);
              time += v.duration;
            }
          }
          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          }); // in case keyframes didn't go to 100%
        }
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);
      _globalTimeline.killTweensOf(parsedTargets);
      _overwritingTween = 0;
    }
    _addToTimeline(parent, _assertThisInitialized(_this3), position);
    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);
    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay) || 0); //in case delay is negative
    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }
  var _proto3 = Tween.prototype;
  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
      tDur = this._tDur,
      dur = this._dur,
      isNegative = totalTime < 0,
      tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime,
      time,
      pt,
      iteration,
      cycleDuration,
      prevIteration,
      isYoyo,
      ratio,
      timeline,
      yoyoEase;
    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;
      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && isNegative) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);
          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        isYoyo = this._yoyo && iteration & 1;
        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          this._tTime = tTime;
          return this;
        }
        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }
      if (!this._initted) {
        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }
        if (prevTime !== this._time) {
          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
          return this;
        }
        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._tTime = tTime;
      this._time = time;
      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }
      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }
      if (time && !prevTime && !suppressEvents) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }
      pt = this._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
      if (this._onUpdate && !suppressEvents) {
        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }
      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }
    return this;
  };
  _proto3.targets = function targets() {
    return this._targets;
  };
  _proto3.invalidate = function invalidate(soft) {
    // "soft" gives us a way to clear out everything EXCEPT the recorded pre-"from" portion of from() tweens. Otherwise, for example, if you tween.progress(1).render(0, true true).invalidate(), the "from" values would persist and then on the next render, the from() tweens would initialize and the current value would match the "from" values, thus animate from the same value to the same value (no animation). We tap into this in ScrollTrigger's refresh() where we must push a tween to completion and then back again but honor its init state in case the tween is dependent on another tween further up on the page.
    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate(soft);
    return _Animation2.prototype.invalidate.call(this, soft);
  };
  _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
      ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
    // if (_isObject(property)) { // performance optimization
    // 	for (p in property) {
    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    // 		}
    // 	}
    // } else {

    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
      return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    } //}

    _alignPlayhead(this, 0);
    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };
  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }
    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }
    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }
    var parsedTargets = this._targets,
      killingTargets = targets ? toArray(targets) : parsedTargets,
      propTweenLookup = this._ptLookup,
      firstPT = this._pt,
      overwrittenProps,
      curLookup,
      curOverwriteProps,
      props,
      p,
      pt,
      i;
    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }
    overwrittenProps = this._op = this._op || [];
    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};
        _forEachName(vars, function (name) {
          return p[name] = 1;
        });
        vars = p;
      }
      vars = _addAliasesToVars(parsedTargets, vars);
    }
    i = parsedTargets.length;
    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];
        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }
        for (p in props) {
          pt = curLookup && curLookup[p];
          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }
            delete curLookup[p];
          }
          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }
    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };
  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };
  Tween.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };
  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    }); // we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };
  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };
  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };
  return Tween;
}(Animation);
_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.

_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
      params = _slice.call(arguments, 0);
    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */

var _setterPlain = function _setterPlain(target, property, value) {
    return target[property] = value;
  },
  _setterFunc = function _setterFunc(target, property, value) {
    return target[property](value);
  },
  _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
    return target[property](data.fp, value);
  },
  _setterAttribute = function _setterAttribute(target, property, value) {
    return target.setAttribute(property, value);
  },
  _getSetter = function _getSetter(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  },
  _renderPlain = function _renderPlain(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
  },
  _renderBoolean = function _renderBoolean(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  },
  _renderComplexString = function _renderComplexString(ratio, data) {
    var pt = data._pt,
      s = "";
    if (!ratio && data.b) {
      //b = beginning string
      s = data.b;
    } else if (ratio === 1 && data.e) {
      //e = ending string
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

        pt = pt._next;
      }
      s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
    }

    data.set(data.t, data.p, s, data);
  },
  _renderPropTweens = function _renderPropTweens(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  },
  _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
    var pt = this._pt,
      next;
    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  },
  _killPropTweensOf = function _killPropTweensOf(property) {
    var pt = this._pt,
      hasNonDependentRemaining,
      next;
    while (pt) {
      next = pt._next;
      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }
      pt = next;
    }
    return !hasNonDependentRemaining;
  },
  _setterWithModifier = function _setterWithModifier(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  },
  _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
    var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

    while (pt) {
      next = pt._next;
      pt2 = first;
      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }
      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }
      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }
      pt = next;
    }
    parent._pt = first;
  }; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)

var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;
    if (next) {
      next._prev = this;
    }
  }
  var _proto4 = PropTween.prototype;
  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };
  return PropTween;
}(); //Initialization tasks

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});
_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
var _media = [],
  _listeners = {},
  _emptyArray = [],
  _lastMediaTime = 0,
  _dispatch = function _dispatch(type) {
    return (_listeners[type] || _emptyArray).map(function (f) {
      return f();
    });
  },
  _onMediaChange = function _onMediaChange() {
    var time = Date.now(),
      matches = [];
    if (time - _lastMediaTime > 2) {
      _dispatch("matchMediaInit");
      _media.forEach(function (c) {
        var queries = c.queries,
          conditions = c.conditions,
          match,
          p,
          anyMatch,
          toggled;
        for (p in queries) {
          match = _win.matchMedia(queries[p]).matches; // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.

          match && (anyMatch = 1);
          if (match !== conditions[p]) {
            conditions[p] = match;
            toggled = 1;
          }
        }
        if (toggled) {
          c.revert();
          anyMatch && matches.push(c);
        }
      });
      _dispatch("matchMediaRevert");
      matches.forEach(function (c) {
        return c.onMatch(c);
      });
      _lastMediaTime = time;
      _dispatch("matchMedia");
    }
  };
var Context = /*#__PURE__*/function () {
  function Context(func, scope) {
    this.selector = scope && selector(scope);
    this.data = [];
    this._r = []; // returned/cleanup functions

    this.isReverted = false;
    func && this.add(func);
  }
  var _proto5 = Context.prototype;
  _proto5.add = function add(name, func, scope) {
    if (_isFunction(name)) {
      scope = func;
      func = name;
      name = _isFunction;
    }
    var self = this,
      f = function f() {
        var prev = _context,
          prevSelector = self.selector,
          result;
        prev && prev !== self && prev.data.push(self);
        scope && (self.selector = selector(scope));
        _context = self;
        result = func.apply(self, arguments);
        _isFunction(result) && self._r.push(result);
        _context = prev;
        self.selector = prevSelector;
        self.isReverted = false;
        return result;
      };
    self.last = f;
    return name === _isFunction ? f(self) : name ? self[name] = f : f;
  };
  _proto5.ignore = function ignore(func) {
    var prev = _context;
    _context = null;
    func(this);
    _context = prev;
  };
  _proto5.getTweens = function getTweens() {
    var a = [];
    this.data.forEach(function (e) {
      return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
    });
    return a;
  };
  _proto5.clear = function clear() {
    this._r.length = this.data.length = 0;
  };
  _proto5.kill = function kill(revert, matchMedia) {
    var _this4 = this;
    if (revert) {
      var tweens = this.getTweens();
      this.data.forEach(function (t) {
        // Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
        if (t.data === "isFlip") {
          t.revert();
          t.getChildren(true, true, false).forEach(function (tween) {
            return tweens.splice(tweens.indexOf(tween), 1);
          });
        }
      }); // save as an object so that we can cache the globalTime for each tween to optimize performance during the sort

      tweens.map(function (t) {
        return {
          g: t.globalTime(0),
          t: t
        };
      }).sort(function (a, b) {
        return b.g - a.g || -1;
      }).forEach(function (o) {
        return o.t.revert(revert);
      }); // note: all of the _startAt tweens should be reverted in reverse order that thy were created, and they'll all have the same globalTime (-1) so the " || -1" in the sort keeps the order properly.

      this.data.forEach(function (e) {
        return !(e instanceof Animation) && e.revert && e.revert(revert);
      });
      this._r.forEach(function (f) {
        return f(revert, _this4);
      });
      this.isReverted = true;
    } else {
      this.data.forEach(function (e) {
        return e.kill && e.kill();
      });
    }
    this.clear();
    if (matchMedia) {
      var i = _media.indexOf(this);
      !!~i && _media.splice(i, 1);
    }
  };
  _proto5.revert = function revert(config) {
    this.kill(config || {});
  };
  return Context;
}();
var MatchMedia = /*#__PURE__*/function () {
  function MatchMedia(scope) {
    this.contexts = [];
    this.scope = scope;
  }
  var _proto6 = MatchMedia.prototype;
  _proto6.add = function add(conditions, func, scope) {
    _isObject(conditions) || (conditions = {
      matches: conditions
    });
    var context = new Context(0, scope || this.scope),
      cond = context.conditions = {},
      mq,
      p,
      active;
    this.contexts.push(context);
    func = context.add("onMatch", func);
    context.queries = conditions;
    for (p in conditions) {
      if (p === "all") {
        active = 1;
      } else {
        mq = _win.matchMedia(conditions[p]);
        if (mq) {
          _media.indexOf(context) < 0 && _media.push(context);
          (cond[p] = mq.matches) && (active = 1);
          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
        }
      }
    }
    active && func(context);
    return this;
  } // refresh() {
  // 	let time = _lastMediaTime,
  // 		media = _media;
  // 	_lastMediaTime = -1;
  // 	_media = this.contexts;
  // 	_onMediaChange();
  // 	_lastMediaTime = time;
  // 	_media = media;
  // }
  ;

  _proto6.revert = function revert(config) {
    this.kill(config || {});
  };
  _proto6.kill = function kill(revert) {
    this.contexts.forEach(function (c) {
      return c.kill(revert, true);
    });
  };
  return MatchMedia;
}();
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */

var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
      format = unit ? _passThrough : _numericIfPossible;
    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);
    if (target.length > 1) {
      var setters = target.map(function (t) {
          return gsap.quickSetter(t, property, unit);
        }),
        l = setters.length;
      return function (value) {
        var i = l;
        while (i--) {
          setters[i](value);
        }
      };
    }
    target = target[0] || {};
    var Plugin = _plugins[property],
      cache = _getCache(target),
      p = cache.harness && (cache.harness.aliases || {})[property] || property,
      // in case it's an alias, like "rotate" for "rotation".
      setter = Plugin ? function (value) {
        var p = new Plugin();
        _quickTween._pt = 0;
        p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p.render(1, p);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);
    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _merge2;
    var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
      func = function func(value, start, startIsRelative) {
        return tween.resetTo(property, value, start, startIsRelative);
      };
    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name,
      effect = _ref3.effect,
      plugins = _ref3.plugins,
      defaults = _ref3.defaults,
      extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });
    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };
    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }
    var tl = new Timeline(vars),
      child,
      next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
    _globalTimeline.remove(tl);
    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;
    while (child) {
      next = child._next;
      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }
      child = next;
    }
    _addToTimeline(_globalTimeline, tl, 0);
    return tl;
  },
  context: function context(func, scope) {
    return func ? new Context(func, scope) : _context;
  },
  matchMedia: function matchMedia(scope) {
    return new MatchMedia(scope);
  },
  matchMediaRefresh: function matchMediaRefresh() {
    return _media.forEach(function (c) {
      var cond = c.conditions,
        found,
        p;
      for (p in cond) {
        if (cond[p]) {
          cond[p] = false;
          found = 1;
        }
      }
      found && c.revert();
    }) || _onMediaChange();
  },
  addEventListener: function addEventListener(type, callback) {
    var a = _listeners[type] || (_listeners[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    var a = _listeners[type],
      i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    selector: selector,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem,
    reverting: function reverting() {
      return _reverting;
    },
    context: function context(toAdd) {
      if (toAdd && _context) {
        _context.data.push(toAdd);
        toAdd._ctx = _context;
      }
      return _context;
    },
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};
_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});
_ticker.add(Timeline.updateRoot);
_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
    var pt = plugin._pt;
    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }
    return pt;
  },
  _addModifiers = function _addModifiers(tween, modifiers) {
    var targets = tween._targets,
      p,
      i,
      pt;
    for (p in modifiers) {
      i = targets.length;
      while (i--) {
        pt = tween._ptLookup[i][p];
        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            // is a plugin
            pt = _getPluginPropTween(pt, p);
          }
          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  },
  _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
    return {
      name: name,
      rawVars: 1,
      //don't pre-process function-based values or "random()" strings.
      init: function init(target, vars, tween) {
        tween._onInit = function (tween) {
          var temp, p;
          if (_isString(vars)) {
            temp = {};
            _forEachName(vars, function (name) {
              return temp[name] = 1;
            }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.

            vars = temp;
          }
          if (modifier) {
            temp = {};
            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }
            vars = temp;
          }
          _addModifiers(tween, vars);
        };
      }
    };
  }; //register core plugins

var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt, v;
    this.tween = tween;
    for (p in vars) {
      v = target.getAttribute(p) || "";
      pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
      pt.op = p;
      pt.b = v; // record the beginning value so we can revert()

      this._props.push(p);
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;
    while (pt) {
      _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d); // if reverting, go back to the original (pt.b)

      pt = pt._next;
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;
    while (i--) {
      this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

Tween.version = Timeline.version = gsap.version = "3.11.3";
_coreReady = 1;
_windowExists() && _wake();
var Power0 = _easeMap.Power0,
  Power1 = _easeMap.Power1,
  Power2 = _easeMap.Power2,
  Power3 = _easeMap.Power3,
  Power4 = _easeMap.Power4,
  Linear = _easeMap.Linear,
  Quad = _easeMap.Quad,
  Cubic = _easeMap.Cubic,
  Quart = _easeMap.Quart,
  Quint = _easeMap.Quint,
  Strong = _easeMap.Strong,
  Elastic = _easeMap.Elastic,
  Back = _easeMap.Back,
  SteppedEase = _easeMap.SteppedEase,
  Bounce = _easeMap.Bounce,
  Sine = _easeMap.Sine,
  Expo = _easeMap.Expo,
  Circ = _easeMap.Circ;

 //export some internal methods/orojects for use in CSSPlugin so that we can externalize that file and allow custom builds that exclude it.


;// CONCATENATED MODULE: ./node_modules/gsap/CSSPlugin.js
/*!
 * CSSPlugin 3.11.3
 * https://greensock.com
 *
 * Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */

var CSSPlugin_win,
  CSSPlugin_doc,
  _docElement,
  _pluginInitted,
  _tempDiv,
  _tempDivStyler,
  _recentSetterPlugin,
  CSSPlugin_reverting,
  CSSPlugin_windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
  _transformProps = {},
  _RAD2DEG = 180 / Math.PI,
  _DEG2RAD = Math.PI / 180,
  _atan2 = Math.atan2,
  CSSPlugin_bigNum = 1e8,
  _capsExp = /([A-Z])/g,
  _horizontalExp = /(left|right|width|margin|padding|x)/i,
  _complexExp = /[\s,\(]\S/,
  _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  },
  _renderCSSProp = function _renderCSSProp(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
  _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
  _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
  },
  //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
  _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
  },
  _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  },
  _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  },
  _setterCSSStyle = function _setterCSSStyle(target, property, value) {
    return target.style[property] = value;
  },
  _setterCSSProp = function _setterCSSProp(target, property, value) {
    return target.style.setProperty(property, value);
  },
  _setterTransform = function _setterTransform(target, property, value) {
    return target._gsap[property] = value;
  },
  _setterScale = function _setterScale(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  },
  _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  },
  _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  },
  _transformProp = "transform",
  _transformOriginProp = _transformProp + "Origin",
  _saveStyle = function _saveStyle(property, isNotCSS) {
    var _this = this;
    var target = this.target,
      style = target.style;
    if (property in _transformProps) {
      this.tfm = this.tfm || {};
      if (property !== "transform") {
        property = _propertyAliases[property] || property;
        ~property.indexOf(",") ? property.split(",").forEach(function (a) {
          return _this.tfm[a] = _get(target, a);
        }) : this.tfm[property] = target._gsap.x ? target._gsap[property] : _get(target, property); // note: scale would map to "scaleX,scaleY", thus we loop and apply them both.
      }

      if (this.props.indexOf(_transformProp) >= 0) {
        return;
      }
      if (target._gsap.svg) {
        this.svgo = target.getAttribute("data-svg-origin");
        this.props.push(_transformOriginProp, isNotCSS, "");
      }
      property = _transformProp;
    }
    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
  },
  _removeIndependentTransforms = function _removeIndependentTransforms(style) {
    if (style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  },
  _revertStyle = function _revertStyle() {
    var props = this.props,
      target = this.target,
      style = target.style,
      cache = target._gsap,
      i,
      p;
    for (i = 0; i < props.length; i += 3) {
      // stored like this: property, isNotCSS, value
      props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].replace(_capsExp, "-$1").toLowerCase());
    }
    if (this.tfm) {
      for (p in this.tfm) {
        cache[p] = this.tfm[p];
      }
      if (cache.svg) {
        cache.renderTransform();
        target.setAttribute("data-svg-origin", this.svgo || "");
      }
      i = CSSPlugin_reverting();
      if (i && !i.isStart && !style[_transformProp]) {
        _removeIndependentTransforms(style);
        cache.uncache = 1; // if it's a startAt that's being reverted in the _initTween() of the core, we don't need to uncache transforms. This is purely a performance optimization.
      }
    }
  },
  _getStyleSaver = function _getStyleSaver(target, properties) {
    var saver = {
      target: target,
      props: [],
      revert: _revertStyle,
      save: _saveStyle
    };
    properties && properties.split(",").forEach(function (p) {
      return saver.save(p);
    });
    return saver;
  },
  _supports3D,
  _createElement = function _createElement(type, ns) {
    var e = CSSPlugin_doc.createElementNS ? CSSPlugin_doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : CSSPlugin_doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

    return e.style ? e : CSSPlugin_doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
  },
  _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
  },
  _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
  _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
    var e = element || _tempDiv,
      s = e.style,
      i = 5;
    if (property in s && !preferPrefix) {
      return property;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while (i-- && !(_prefixes[i] + property in s)) {}
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  },
  _initCore = function _initCore() {
    if (CSSPlugin_windowExists() && window.document) {
      CSSPlugin_win = window;
      CSSPlugin_doc = CSSPlugin_win.document;
      _docElement = CSSPlugin_doc.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

      _supports3D = !!_checkPropPrefix("perspective");
      CSSPlugin_reverting = gsap.core.reverting;
      _pluginInitted = 1;
    }
  },
  _getBBoxHack = function _getBBoxHack(swapIfPossible) {
    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;
    _docElement.appendChild(svg);
    svg.appendChild(this);
    this.style.display = "block";
    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox; //store the original

        this.getBBox = _getBBoxHack;
      } catch (e) {}
    } else if (this._gsapBBox) {
      bbox = this._gsapBBox();
    }
    if (oldParent) {
      if (oldSibling) {
        oldParent.insertBefore(this, oldSibling);
      } else {
        oldParent.appendChild(this);
      }
    }
    _docElement.removeChild(svg);
    this.style.cssText = oldCSS;
    return bbox;
  },
  _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
    var i = attributesArray.length;
    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  },
  _getBBox = function _getBBox(target) {
    var bounds;
    try {
      bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
    } catch (error) {
      bounds = _getBBoxHack.call(target, true);
    }
    bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  },
  _isSVG = function _isSVG(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  },
  //reports if the element is an SVG on which getBBox() actually works
  _removeProperty = function _removeProperty(target, property) {
    if (property) {
      var style = target.style;
      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }
      if (style.removeProperty) {
        if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
          //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
          property = "-" + property;
        }
        style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        style.removeAttribute(property);
      }
    }
  },
  _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
  },
  _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  },
  _nonStandardLayouts = {
    grid: 1,
    flex: 1
  },
  //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
  _convertToUnit = function _convertToUnit(target, property, value, unit) {
    var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
      style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;
    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);
    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }
    if (!parent || parent === CSSPlugin_doc || !parent.appendChild) {
      parent = CSSPlugin_doc.body;
    }
    cache = parent._gsap;
    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
      return _round(curValue / cache.width * amount);
    } else {
      (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";
      if (horizontal && toPercent) {
        cache = _getCache(parent);
        cache.time = _ticker.time;
        cache.width = parent[measureProperty];
      }
    }
    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  },
  _get = function _get(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();
    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];
      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }
    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];
      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
      }
    }

    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  },
  _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
    // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    if (!start || start === "none") {
      // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
      var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);
      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
      }
    }

    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      endValues;
    pt.b = start;
    pt.e = end;
    start += ""; // ensure values are strings

    end += "";
    if (end === "auto") {
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      target.style[prop] = start;
    }
    a = [start, end];
    _colorStringFilter(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().

    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];
    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }
        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;
          if (!endUnit) {
            //if something like "perspective:300" is passed in and we must add a unit to the end
            endUnit = endUnit || _config.units[prop] || startUnit;
            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }
          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
            s: startNum,
            c: endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }
    _relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

    return pt;
  },
  _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  },
  _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
    var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      //the user provided them in the wrong order, so flip them
      value = x;
      x = y;
      y = value;
    }
    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  },
  _renderClearProps = function _renderClearProps(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;
      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;
        while (--i > -1) {
          prop = props[i];
          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }
          _removeProperty(target, prop);
        }
      }
      if (clearTransforms) {
        _removeProperty(target, _transformProp);
        if (cache) {
          cache.svg && target.removeAttribute("transform");
          _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.

          cache.uncache = 1;
          _removeIndependentTransforms(style);
        }
      }
    }
  },
  // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
  _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;
        plugin._props.push(property);
        return 1;
      }
    }
    /* className feature (about 0.4kb gzipped).
    , className(plugin, target, property, endValue, tween) {
    	let _renderClassName = (ratio, data) => {
    			data.css.render(ratio, data.css);
    			if (!ratio || ratio === 1) {
    				let inline = data.rmv,
    					target = data.t,
    					p;
    				target.setAttribute("class", ratio ? data.e : data.b);
    				for (p in inline) {
    					_removeProperty(target, p);
    				}
    			}
    		},
    		_getAllStyles = (target) => {
    			let styles = {},
    				computed = getComputedStyle(target),
    				p;
    			for (p in computed) {
    				if (isNaN(p) && p !== "cssText" && p !== "length") {
    					styles[p] = computed[p];
    				}
    			}
    			_setDefaults(styles, _parseTransform(target, 1));
    			return styles;
    		},
    		startClassList = target.getAttribute("class"),
    		style = target.style,
    		cssText = style.cssText,
    		cache = target._gsap,
    		classPT = cache.classPT,
    		inlineToRemoveAtEnd = {},
    		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
    		changingVars = {},
    		startVars = _getAllStyles(target),
    		transformRelated = /(transform|perspective)/i,
    		endVars, p;
    	if (classPT) {
    		classPT.r(1, classPT.d);
    		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
    	}
    	target.setAttribute("class", data.e);
    	endVars = _getAllStyles(target, true);
    	target.setAttribute("class", startClassList);
    	for (p in endVars) {
    		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
    			changingVars[p] = endVars[p];
    			if (!style[p] && style[p] !== "0") {
    				inlineToRemoveAtEnd[p] = 1;
    			}
    		}
    	}
    	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
    	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
    		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
    	}
    	_parseTransform(target, true); //to clear the caching of transforms
    	data.css = new gsap.plugins.css();
    	data.css.init(target, changingVars, tween);
    	plugin._props.push(...data.css._props);
    	return 1;
    }
    */
  },
  /*
   * --------------------------------------------------------------------------------------
   * TRANSFORMS
   * --------------------------------------------------------------------------------------
   */
  _identity2DMatrix = [1, 0, 0, 1, 0, 0],
  _rotationalProperties = {},
  _isNullTransform = function _isNullTransform(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  },
  _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
    var matrixString = _getComputedProperty(target, _transformProp);
    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  },
  _getMatrix = function _getMatrix(target, force2D) {
    var cache = target._gsap || _getCache(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;
    if (cache.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;
      if (!parent || !target.offsetParent) {
        // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
        addedToDOM = 1; //flag

        nextSibling = target.nextElementSibling;
        _docElement.appendChild(target); //we must add it to the DOM in order to get values properly
      }

      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");
      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }
    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  },
  _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;
    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }
    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }
    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  },
  _parseTransform = function _parseTransform(target, uncache) {
    var cache = target._gsap || new GSCache(target);
    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }
    var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      cs = getComputedStyle(target),
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    if (cs.translate) {
      // accommodate independent transforms by combining them into normal ones.
      if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
        style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
      }
      style.scale = style.rotate = style.translate = "none";
    }
    matrix = _getMatrix(target, cache.svg);
    if (cache.svg) {
      if (cache.uncache) {
        // if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
        t2 = target.getBBox();
        origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
        t1 = "";
      } else {
        t1 = !uncache && target.getAttribute("data-svg-origin"); //  Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
      }

      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }
    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;
    if (matrix !== _identity2DMatrix) {
      a = matrix[0]; //a11

      b = matrix[1]; //a21

      c = matrix[2]; //a31

      d = matrix[3]; //a41

      x = a12 = matrix[4];
      y = a22 = matrix[5]; //2D matrix

      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        } //3D matrix
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG; //rotationX

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        } //rotationY

        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        } //rotationZ

        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }
        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }
        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }
      if (cache.svg) {
        //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }
    uncache = uncache || cache.uncache;
    cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = _round(scaleX);
    cache.scaleY = _round(scaleY);
    cache.rotation = _round(rotation) + deg;
    cache.rotationX = _round(rotationX) + deg;
    cache.rotationY = _round(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;
    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }
    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  },
  _firstTwoOnly = function _firstTwoOnly(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  },
  //for handling transformOrigin values, stripping out the 3rd dimension
  _addPxTranslate = function _addPxTranslate(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  },
  _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;
    _renderCSSTransforms(ratio, cache);
  },
  _zeroDeg = "0deg",
  _zeroPx = "0px",
  _endParenthesis = ") ",
  _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
    var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)

    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;
      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }
    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }
    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }
    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }
    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }
    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }
    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }
    target.style[_transformProp] = transforms || "translate(0, 0)";
  },
  _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
    var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
      //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }
    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;
      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;
        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }
      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
      //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the transform attribute changes!)
  },
  _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
    var cap = 360,
      isString = _isString(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;
    if (isString) {
      direction = endValue.split("_")[1];
      if (direction === "short") {
        change %= cap;
        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }
      if (direction === "cw" && change < 0) {
        change = (change + cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap;
      }
    }
    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
  },
  _assign = function _assign(target, source) {
    // Internet Explorer doesn't have Object.assign(), so we recreate it here.
    for (var p in source) {
      target[p] = source[p];
    }
    return target;
  },
  _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
    //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
    var startCache = _assign({}, target._gsap),
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      style = target.style,
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;
    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      _removeProperty(target, _transformProp);
      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }
    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];
      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;
        plugin._props.push(p);
      }
    }
    _assign(endCache, startCache);
  }; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.

_forEachName("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
    r = "Right",
    b = "Bottom",
    l = "Left",
    props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
      return index < 2 ? name + side : "border" + side + name;
    });
  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;
    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }
    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
      style = target.style,
      startAt = tween.vars.startAt,
      startValue,
      endValue,
      endNum,
      startNum,
      type,
      specialProp,
      p,
      startUnit,
      endUnit,
      relative,
      isTransformRelated,
      transformPropTween,
      cache,
      smooth,
      hasPriority,
      inlineProps;
    _pluginInitted || _initCore(); // we may call init() multiple times on the same plugin instance, like when adding special properties, so make sure we don't overwrite the revert data or inlineProps

    this.styles = this.styles || _getStyleSaver(target);
    inlineProps = this.styles.props;
    this.tween = tween;
    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }
      endValue = vars[p];
      if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
        // plugins
        continue;
      }
      type = typeof endValue;
      specialProp = _specialProps[p];
      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }
      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = _replaceRandom(endValue);
      }
      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        _colorExp.lastIndex = 0;
        if (!_colorExp.test(startValue)) {
          // colors don't have units
          startUnit = getUnit(startValue);
          endUnit = getUnit(endValue);
        }
        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        props.push(p);
        inlineProps.push(p, 0, style[p]);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
          getUnit(startValue + "") || (startValue += _config.units[p] || getUnit(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
        } else {
          startValue = _get(target, p);
        }
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);
        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }
            inlineProps.push("visibility", 0, style.visibility);
            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }
          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }
        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          this.styles.save(p);
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new PropTween(this._pt, cache, "scaleY", startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum || 0, _renderCSSProp);
            this._pt.u = 0;
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }
            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);
            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }
        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;
          if (startUnit !== endUnit && endUnit !== "%") {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
          } else {
            _missingPlugin(p, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
        }
        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
        props.push(p);
      }
    }
    hasPriority && _sortPropTweensByPriority(this);
  },
  render: function render(ratio, data) {
    if (data.tween._time || !CSSPlugin_reverting()) {
      var pt = data._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
gsap.utils.checkPrefix = _checkPropPrefix;
gsap.core.getStyleSaver = _getStyleSaver;
(function (positionAndScale, rotation, others, aliases) {
  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });
  _forEachName(rotation, function (name) {
    _config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  _forEachName(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _config.units[name] = "px";
});
gsap.registerPlugin(CSSPlugin);

;// CONCATENATED MODULE: ./node_modules/gsap/index.js


var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
  // to protect from tree shaking
  TweenMaxWithCSS = gsapWithCSS.core.Tween;

// EXTERNAL MODULE: ./node_modules/gsap/dist/ScrollTrigger.js
var ScrollTrigger = __webpack_require__(752);
// EXTERNAL MODULE: ./node_modules/gsap/dist/ScrollSmoother.js
var ScrollSmoother = __webpack_require__(769);
;// CONCATENATED MODULE: ./app/utils/math.js
function getNewRandom(max, oldRandom) {
  let newRandom = Math.floor(Math.random() * max);
  if (oldRandom) {
    if (newRandom >= oldRandom) {
      newRandom += 1;
    }
  }
  return newRandom;
}
function between(x, min, max) {
  return x >= min && x <= max;
}
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
;// CONCATENATED MODULE: ./app/constants.js
const SIZES = {
  breakpoint: 768
};
;// CONCATENATED MODULE: ./app/classes/Intro.js



gsapWithCSS.registerPlugin(ScrollTrigger.ScrollTrigger, ScrollSmoother.ScrollSmoother);




/* harmony default export */ const Intro = (class {
  constructor() {
    this.currentIndex = 0;
    this.refreshed = true;
    this.bgImages = document.querySelectorAll('.js-intro-bg-image');
    this.site = document.querySelector('.js-site');
    window.innerWidth > SIZES.breakpoint && this.animateLabel();
    this.animateImage();
    this.initImages();
    this.loadImage();
    this.reloadSection();
  }
  initImages() {
    this.images = shuffleArray(document.querySelector('.js-intro-bg').images);
  }
  loadImage() {
    if (!this.refreshed) return;
    this.currentIndex = this.currentIndex == this.images.length ? 0 : this.currentIndex;
    this.bgImages.forEach(bgImage => {
      bgImage.style.backgroundImage = `url('${this.images[this.currentIndex]}')`;
      imagesloaded_default()(bgImage, {
        background: true
      }, function (instance) {
        document.body.classList.add('is-loaded');
        setTimeout(function () {
          bgImage.classList.add('is-loaded');
        }, 750);
      });
    });
    this.currentIndex++;
  }
  reloadSection() {
    in_view_min_default()('.js-outro').on('enter', el => {
      this.refreshed = true;
      this.site.classList.remove('is-scrolled');
    }).on('exit', el => {});
    in_view_min_default()('.js-curation').on('enter', el => {
      if (document.body.scrollingDown) {
        this.loadImage();
        this.refreshed = false;
      }
    }).on('exit', el => {});
  }
  animateLabel() {
    gsapWithCSS.fromTo('.js-intro-label', {
      scale: 0.667,
      y: 0
    }, {
      scale: 1,
      scrollTrigger: {
        trigger: '.js-intro-container',
        y: '2px',
        pin: true,
        pinType: document.querySelector('.js-scrollable').style.transform ? 'transform' : 'fixed',
        scrub: true,
        onEnter: () => {
          this.site.classList.remove('is-scrolled');
        },
        onLeave: () => {
          this.site.classList.add('is-scrolled');
          document.body.classList.add('is-looped');
        },
        onEnterBack: () => {
          this.site.classList.remove('is-scrolled');
        }
      }
    });
  }
  animateImage() {
    gsapWithCSS.fromTo('.js-outro-shadow', {
      height: '50vh'
    }, {
      height: '0',
      scrollTrigger: {
        trigger: '.js-contact',
        start: 'bottom 50%',
        end: 'bottom top',
        scrub: true
      }
    });
    gsapWithCSS.to('.js-intro-bg', {
      scrollTrigger: {
        trigger: '.js-intro',
        start: 'top top',
        end: 'bottom top',
        pin: '.js-intro-bg',
        scrub: true,
        pinType: document.querySelector('.js-scrollable').style.transform ? 'transform' : 'fixed',
        onLeave: () => {
          gsapWithCSS.to(document.querySelector('.js-media-popup'), {
            y: window.innerWidth > SIZES.breakpoint ? '100%' : '-100%',
            duration: 0.4,
            ease: 'ease.in',
            onComplete: () => {
              document.querySelector('.js-media-popup').style.display = 'none';
            }
          });
        }
      },
      opacity: 0.1
    });
    in_view_min_default()('.js-outro').on('enter', el => {
      document.body.classList.add('is-looped');
    }).on('exit', el => {});
  }
});
;// CONCATENATED MODULE: ./app/classes/Agency.js



gsapWithCSS.registerPlugin(ScrollTrigger.ScrollTrigger, ScrollSmoother.ScrollSmoother);

/* harmony default export */ const Agency = (class {
  constructor() {
    this.smoother = ScrollSmoother.ScrollSmoother.get();
    this.images = document.querySelectorAll('.js-agency-image');
    this.texts = document.querySelector('.js-agency-texts');
    this.initTextsAnimation();
    if (window.innerWidth > SIZES.breakpoint) {
      this.initDesktopImages();
    }
  }
  initTextsAnimation() {
    ScrollTrigger.ScrollTrigger.create({
      trigger: '.js-agency-texts',
      // start: window.innerWidth > SIZES.breakpoint ? 'center center' : 'top 30%',
      start: 'center center',
      end: window.innerWidth > SIZES.breakpoint ? 'top bottom' : 'top 60%',
      endTrigger: '.curation',
      pin: true,
      pinType: document.querySelector('.js-scrollable').style.transform ? 'transform' : 'fixed',
      onUpdate: self => {
        if (self.progress >= 0 && self.progress <= 0.3) {
          this.texts.dataset.index = 1;
          gsapWithCSS.to('.js-agency-services-text', {
            y: '0',
            duration: 0.5,
            ease: 'sine.out'
          });
        }
        if (self.progress > 0.3 && self.progress <= 0.8) {
          this.texts.dataset.index = 2;
          gsapWithCSS.to('.js-agency-services-text', {
            y: '-2em',
            duration: 0.5,
            ease: 'sine.out'
          });
        }
        if (self.progress > 0.8 && self.progress <= 1) {
          this.texts.dataset.index = 3;
          gsapWithCSS.to('.js-agency-services-text', {
            y: '-4em',
            duration: 0.5,
            ease: 'sine.out'
          });
        }
      }
    });
  }
  initDesktopImages() {
    let smoother = ScrollSmoother.ScrollSmoother.get();
    smoother.effects('.agency__image--1', {
      speed: 0.8
    });
    smoother.effects('.agency__image--2', {
      speed: 0.9,
      lag: 0.1
    });
    smoother.effects('.agency__image--3', {
      speed: 0.85
    });
    smoother.effects('.agency__image--4', {
      speed: 0.9
    });
    smoother.effects('.agency__image--5', {
      speed: 0.9,
      lag: 0.1
    });
    smoother.effects('.agency__image--6', {
      speed: 1.1
    });
    const speeds = [1.1, 1.7, 1.3, 2, 1.2, 1.7, 2.1, 1.8];
    const inertia = [0.5, 0.7, 0.9, 0.9, 1.5, 2.1, 1.8, 0.8];
    document.querySelector('.js-agency').addEventListener('mousemove', e => {
      const movementX = (e.screenX - window.innerWidth / 2) / 10;
      const movementY = (e.screenY - window.innerHeight / 2) / 10;
      gsapWithCSS.to('.js-agency-image-container img', {
        x: function (index, target, targets) {
          return movementX * inertia[index];
        },
        y: function (index, target, targets) {
          return movementY * inertia[index];
        },
        duration: function (index, target, targets) {
          return speeds[index];
        }
      });
    });
  }
});
;// CONCATENATED MODULE: ./app/classes/Projects.js


// import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);




/* harmony default export */ const Projects = (class {
  constructor() {
    let self = this;
    this.refreshed = true;
    this.horizontalScroll = null;
    this.projectGroups = document.querySelectorAll('.js-projects-group');
    this.initProjects();
    this.addContent();
    if (window.innerWidth > SIZES.breakpoint) {
      this.setImagesDimensions();
      this.initHorizontalScroll();
      this.reloadProjects();
      window.addEventListener('resize', () => {
        self.setImagesDimensions();
      });
    }
  }
  initProjects() {
    this.projectGroups.forEach(projectGroup => {
      projectGroup.currentIndex = 0;
      projectGroup.projects = shuffleArray(projectGroup.projects);
    });
  }
  reloadProjects() {
    this.addContent();
    this.setImagesDimensions();
    this.increaseIndexes();
  }
  increaseIndexes() {
    document.querySelectorAll('.js-projects-group').forEach(projectGroup => {
      projectGroup.currentIndex++;
      projectGroup.currentIndex = projectGroup.currentIndex == projectGroup.projects.length ? 0 : projectGroup.currentIndex;
    });
  }
  addContent() {
    let i = 0;
    this.projectGroups.forEach(projectGroup => {
      let projectImage = projectGroup.querySelector('.js-project-image');
      let projectTitle = projectGroup.querySelector('.js-project-title');
      let projectCategory = projectGroup.querySelector('.js-project-category');
      projectImage.setAttribute('src', projectGroup.projects[projectGroup.currentIndex]['image_url']);
      projectTitle.textContent = projectGroup.projects[projectGroup.currentIndex]['title'];
      projectCategory.textContent = projectGroup.projects[projectGroup.currentIndex]['category'];
      imagesloaded_default()(projectImage, function (instance) {
        projectImage.classList.add('is-loaded');
      });
    });
  }
  setImagesDimensions() {
    document.querySelectorAll('.js-projects-group').forEach(projectGroup => {
      let projectCover = projectGroup.querySelector('.js-project-cover');
      projectCover.style.width = window.innerHeight * projectGroup.projects[projectGroup.currentIndex]['image_width'] / projectGroup.projects[projectGroup.currentIndex]['image_height'] + 'px';
    });
  }
  initHorizontalScroll() {
    let showcase = document.querySelector('.js-projects-showcase');
    this.horizontalScroll = gsapWithCSS.to(showcase, {
      ease: 'none',
      x: '-100%',
      scrollTrigger: {
        trigger: '.js-projects',
        pin: true,
        pinType: document.querySelector('.js-scrollable').style.transform ? 'transform' : 'fixed',
        scrub: true,
        onUpdate: self => {
          gsapWithCSS.to('.projects__label', {
            y: (index, target) => {
              return -self.progress.toFixed(3) * 100 * target.parentElement.dataset.inertia + '%';
            }
          });
        },
        end: () => '+=' + showcase.offsetWidth
      }
    });
  }
});
;// CONCATENATED MODULE: ./app/classes/Curation.js



gsapWithCSS.registerPlugin(ScrollTrigger.ScrollTrigger, ScrollSmoother.ScrollSmoother);

/* harmony default export */ const Curation = (class {
  constructor() {
    if (window.innerWidth > SIZES.breakpoint) {
      this.initCurationDesktop();
    } else {
      this.initCurationMobile();
    }
  }
  initCurationMobile() {
    let curationTimeline = gsapWithCSS.timeline();
    curationTimeline.fromTo('.js-curation-image-front', {
      x: '100vw'
    }, {
      x: '0vw',
      duration: 0.7,
      ease: 'sine.out'
    }, 0);
    curationTimeline.fromTo('.js-curation-image-back', {
      x: '-100vw'
    }, {
      x: '0vw',
      duration: 0.7,
      ease: 'sine.out'
    }, 0);
    curationTimeline.to('.js-curation-image-back, .js-curation-image-front', {
      scale: 0.3,
      x: 0,
      duration: 0.7,
      ease: 'sine.in'
    });
    ScrollTrigger.ScrollTrigger.create({
      trigger: '.js-curation',
      start: 'center 75%',
      end: 'bottom top',
      animation: curationTimeline,
      // scrub: true,
      toggleActions: 'play none none reverse'
    });
  }
  initCurationDesktop() {
    let curationTimeline = gsapWithCSS.timeline();
    curationTimeline.fromTo('.js-curation-image-front', {
      x: '65vw'
    }, {
      x: '0vw',
      duration: 2
    }, 0);
    curationTimeline.fromTo('.js-curation-image-back', {
      x: '-65vw'
    }, {
      x: '0vw',
      duration: 2
    }, 0);
    curationTimeline.to('.js-curation-image-back, .js-curation-image-front', {
      scale: 0.3,
      x: 0,
      duration: 2
    });
    ScrollTrigger.ScrollTrigger.create({
      trigger: '.js-curation',
      pin: '.js-curation',
      pinType: document.querySelector('.js-scrollable').style.transform ? 'transform' : 'fixed',
      start: 'bottom bottom',
      end: '+=2000px',
      animation: curationTimeline,
      scrub: 1.2,
      toggleActions: 'play none none reverse'
    });
  }
});
;// CONCATENATED MODULE: ./app/classes/Services.js


// import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
// import imagesLoaded from 'imagesloaded';


/* harmony default export */ const Services = (class {
  constructor() {
    this.sortBrandCategories();
    // sortBrands(document.querySelector('.js-brands-list'));
    if (window.innerWidth > SIZES.breakpoint) {
      this.initDesktopScroll();
      this.highlightBrandCategories();
    } else {
      this.initMobileAnimation();
    }
  }
  sortBrandCategories() {
    let brandsList = document.querySelector('.js-brands-list');
    let specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    [...brandsList.children].sort((a, b) => a.querySelector('.js-brands-name').innerText > b.querySelector('.js-brands-name').innerText ? 1 : -1).forEach(node => {
      brandsList.appendChild(node);
    });
    [...brandsList.children].forEach((node, index) => {
      if (specialChars.test(node.querySelector('.js-brands-name').innerText.charAt(0))) {
        brandsList.appendChild(node);
      }
    });
    [...brandsList.children].forEach((node, index) => {
      if (index > 0) {
        if (node.querySelector('.js-brands-letter').innerText == brandsList.querySelectorAll('.js-brands-letter')[index - 1].innerText) {
          node.classList.add('is-repeating');
        }
      }
    });
  }
  highlightBrandCategories() {
    let brandsList = document.querySelector('.js-brands-list');
    function setActiveCategory(index) {
      document.querySelector('.js-categories-list').dataset.activeCategory = index;
      brandsList.dataset.activeCategory = index;
    }
    function resetCategories() {
      setActiveCategory(0);
      brandsList.classList.remove('is-chosen');
    }
    document.querySelectorAll('.js-category').forEach((item, index) => {
      item.addEventListener('mouseenter', e => {
        if (brandsList.classList.contains('is-chosen')) return;
        setActiveCategory(item.dataset.category);
      });
      item.addEventListener('click', e => {
        e.stopPropagation();
        if (brandsList.classList.contains('is-chosen')) {
          resetCategories();
          brandsList.classList.remove('is-chosen');
          return;
        }
        brandsList.classList.add('is-chosen');
        setActiveCategory(item.dataset.category);
      });
    });
    document.body.addEventListener('click', e => {
      resetCategories();
    });
    document.querySelector('.js-categories-list').addEventListener('mouseleave', e => {
      if (brandsList.classList.contains('is-chosen')) {
        return;
      }
      resetCategories();
    });
  }
  initMobileAnimation() {
    ScrollTrigger.ScrollTrigger.create({
      trigger: '.js-services-bg',
      start: 'top top',
      endTrigger: '.js-contact',
      end: 'bottom bottom',
      pin: true,
      scrub: true,
      pinType: document.querySelector('.js-scrollable').style.transform ? 'transform' : 'fixed'
    });
  }
  initDesktopScroll() {
    ScrollTrigger.ScrollTrigger.create({
      trigger: '.js-services',
      pin: '.js-projects-showcase',
      pinType: document.querySelector('.js-scrollable').style.transform ? 'transform' : 'fixed',
      start: 'top-=3px bottom',
      endTrigger: window.innerWidth > 1024 ? '.js-services' : '.js-contact',
      end: window.innerWidth > 1024 ? 'bottom bottom' : 'top top',
      onUpdate: self => {
        if (window.innerWidth > 1024) {
          return;
        }
        document.querySelector('.js-projects').style.position = 'fixed';
      }
    });
    let headingHeight = document.querySelector('.services__services__group__heading span').offsetHeight;
    document.querySelectorAll('.services__services__group__heading').forEach((item, index) => {
      ScrollTrigger.ScrollTrigger.create({
        trigger: item,
        pin: item,
        pinType: document.querySelector('.js-scrollable').style.transform ? 'transform' : 'fixed',
        start: `top ${headingHeight * (index + 1)}`,
        end: 'top top',
        endTrigger: '.js-contact'
      });
    });
    gsapWithCSS.to('.js-services', {
      scrollTrigger: {
        trigger: '.js-contact',
        start: '30% bottom',
        end: 'top top',
        scrub: true
      }
    });
    ScrollTrigger.ScrollTrigger.create({
      trigger: '.js-brands-list',
      start: 'top 40%+=200px',
      end: `+=${document.querySelector('.js-brands-list').offsetHeight * 2}`,
      scrub: true,
      onUpdate: self => {
        gsapWithCSS.set('.js-brands-header', {
          y: -document.querySelector('.js-brands-list').getBoundingClientRect().height * 2 * self.progress
        });
      }
    });
  }
});
;// CONCATENATED MODULE: ./app/classes/Navigation.js


// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);




/* harmony default export */ const Navigation = (class {
  constructor() {
    this.scrolling = ScrollSmoother.ScrollSmoother.get();
    this.internalLinks = document.querySelectorAll('.js-internal-link');
    this.header = document.querySelector('.js-header');
    this.headerNav = document.querySelector('.js-header-nav');
    this.headerButton = document.querySelector('.js-header-button');
    this.sections = [];
    document.querySelector('.js-show-newsletter') && this.initNewsletter();
    this.initOffsetValues();
    this.addClickEvents();
    this.initSectionsPositions();
    if (window.innerWidth > SIZES.breakpoint) {
      this.initDesktopColorToggle();
    } else {}
    window.addEventListener('resize', () => {
      this.initSectionsPositions();
      this.initOffsetValues();
    });
    let self = this;
    window.addEventListener('scroll', function () {
      self.highlightSection(self.sections, window.pageYOffset);
    }, false);
    if (window.innerWidth > 1025) {
      this.addMouseEvents();
      window.addEventListener('resize', () => {
        this.initDesktopColorToggle();
      });
    }
  }
  initNewsletter() {
    let newsletterTrigger = document.querySelector('.js-show-newsletter');
    let newsletterEl = document.querySelector('.js-contact-newsletter');
    newsletterTrigger.addEventListener('click', e => {
      newsletterEl.classList.add('is-active');
    });
  }
  initDesktopColorToggle() {
    let colorTrigger = null;
    if (colorTrigger) {
      colorTrigger.kill();
    }
    let pixelsToScroll = document.querySelector('.js-projects-showcase').getBoundingClientRect().width + 2020 - window.innerWidth;
    colorTrigger = ScrollTrigger.ScrollTrigger.create({
      trigger: '.js-curation',
      start: 'top-=200 top',
      end: `bottom+=${pixelsToScroll} top`,
      onEnter: self => {
        this.header.dataset.color = 'black';
      },
      onLeave: self => {
        this.header.dataset.color = 'white';
      },
      onEnterBack: self => {
        this.header.dataset.color = 'black';
      },
      onLeaveBack: self => {
        this.header.dataset.color = 'white';
      }
    });
  }
  initOffsetValues() {
    this.internalLinks.forEach((internalLink, index) => {
      internalLink.dataset.offset = this.scrolling.offset('#' + internalLink.dataset.slug);
    });
  }
  addClickEvents() {
    this.headerButton.addEventListener('click', e => {
      e.stopPropagation();
      this.header.classList.toggle('is-mobile-open');
      document.body.classList.toggle('is-locked');
    });
    document.querySelectorAll('.js-header a').forEach((link, index) => {
      link.addEventListener('click', e => {
        e.stopPropagation();
      });
    });
    document.body.addEventListener('click', () => {
      if (this.header.classList.contains('is-mobile-open')) {
        this.header.classList.remove('is-mobile-open');
        document.body.classList.remove('is-locked');
      }
    });
    this.internalLinks.forEach((internalLink, index) => {
      internalLink.addEventListener('click', e => {
        e.stopPropagation();
        this.header.classList.remove('is-mobile-open');
        document.body.classList.remove('is-locked');
        gsapWithCSS.to(this.scrolling, {
          scrollTop: Math.min(ScrollTrigger.ScrollTrigger.maxScroll(window), internalLink.dataset.slug == 'intro' ? 1 : internalLink.dataset.offset),
          duration: 2.5,
          ease: Power3.easeInOut
        });
      });
    });
  }
  addMouseEvents() {
    let hoverTimer;
    let self = this;
    this.header.addEventListener('mouseenter', event => {
      hoverTimer = setTimeout(function () {
        self.header.classList.add('is-active');
      }, 150);
    });
    this.header.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
      self.header.classList.remove('is-active');
    });
  }
  initSectionsPositions() {
    this.internalLinks.forEach((internalLink, index) => {
      this.sections[index] = {
        slug: internalLink.dataset.slug,
        top: this.scrolling.offset('#' + internalLink.dataset.slug)
      };
    });
    this.sections[0].color = 'black';
    this.sections[1].color = 'black';
    this.sections[2].color = 'black';
    this.sections[3].color = 'white';
    this.sections[4].color = 'white';
    this.sections[5].color = 'white';
    this.sections[0].end = this.sections[1].top - 1;
    this.sections[1].end = this.sections[2].top - 1;
    this.sections[2].end = this.sections[3].top - 1;
    this.sections[3].end = this.sections[4].top - 1;
    this.sections[4].end = this.sections[5].top - 1;
    this.sections[5].end = this.sections[5].top + document.querySelector(`#${this.sections[5].slug}`).offsetHeight;
    console.log(this.sections[4], '4');
    console.log(this.sections[5], '5');
  }
  highlightSection(sections, y) {
    sections.forEach(function (el) {
      if (between(y + 200, el.top, el.end)) {
        let index = document.querySelector(`.js-internal-link[data-slug="${el.slug}"]`).dataset.index || 0;
        document.querySelector('.js-header-nav-main').dataset.index = index;
      }
    });
  }
});
;// CONCATENATED MODULE: ./app/utils/sorting.js
function sortBrands(brandsList) {
  // let brandsList = document.querySelector('.js-brands-list');
  let specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  [...brandsList.children].sort((a, b) => a.querySelector('.js-media-nav-term').innerText > b.querySelector('.js-media-nav-term').innerText ? 1 : -1).forEach(node => {
    brandsList.appendChild(node);
  });
  [...brandsList.children].forEach((node, index) => {
    if (specialChars.test(node.querySelector('.js-media-nav-term').innerText.charAt(0))) {
      brandsList.appendChild(node);
    }
  });
  [...brandsList.children].forEach((node, index) => {
    if (index > 0) {
      if (node.querySelector('.js-media-item-letter').innerText == brandsList.querySelectorAll('.js-media-item-letter')[index - 1].innerText) {
        node.classList.add('is-repeating');
      }
    }
  });
}
// EXTERNAL MODULE: ./node_modules/gsap/dist/ScrollToPlugin.js
var ScrollToPlugin = __webpack_require__(434);
;// CONCATENATED MODULE: ./app/classes/BetterSlideToggle.js

/* harmony default export */ const BetterSlideToggle = (class {
  constructor(el) {
    this.el = el;
    this.term = el.querySelector('.js-slide-toggle-term');
    this.definition = el.querySelector('.js-slide-toggle-definition');
    this.tl = gsapWithCSS.timeline({
      reversed: true,
      paused: true
    }).to(this.definition, {
      height: 'auto',
      duration: 0.25,
      ease: 'linear'
    });
    el.tl = this.tl;
    this.addEvents();
  }
  addEvents() {
    this.term.addEventListener('click', () => {
      const container = this.el.closest('.js-slide-toggle-container');
      const allItems = container.querySelectorAll('.js-slide-toggle-item');
      const otherItems = [...allItems].filter(item => item !== this.el);
      if (this.tl.reversed()) {
        otherItems.forEach(item => {
          item.tl.reverse();
          item.classList.remove('is-active');
        });
        this.tl.play();
        this.el.classList.add('is-active');
      } else {
        this.tl.reverse();
        this.el.classList.remove('is-active');
      }
    });
  }
});
// EXTERNAL MODULE: ./node_modules/plyr/dist/plyr.min.js
var plyr_min = __webpack_require__(180);
var plyr_min_default = /*#__PURE__*/__webpack_require__.n(plyr_min);
;// CONCATENATED MODULE: ./app/classes/CustomVideo.js

/* harmony default export */ const CustomVideo = (class {
  constructor(el) {
    this.video = el;
    el.plyr = this.initPlyr(this.video);
    el.plyr.on('pause', () => {
      document.querySelector('.js-cursor-follower').classList.remove('is-played');
    });
    el.plyr.on('play', () => {
      if (document.body.classList.contains('is-zoom')) {
        this.pauseOtherVideos(el);
        document.querySelector('.js-cursor-follower').classList.add('is-played');
      }
    });
    el.closest('.plyr').addEventListener('click', event => {
      if (el.plyr.touch && document.body.classList.contains('is-zoom')) {
        if (el.plyr.playing) {
          el.plyr.pause();
        } else {
          el.plyr.play();
        }
      }
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          entry.target.plyr.play();
        } else {
          entry.target.plyr.pause();
        }
      });
    }, {
      threshold: [0.5]
    });
    observer.observe(el);
  }
  initPlyr(el) {
    return new (plyr_min_default())(el, {
      clickToPlay: true,
      muted: true,
      loop: {
        active: true
      },
      fullscreen: {
        enabled: false
      },
      controls: ['progress']
    });
  }
  pauseOtherVideos(currentEl) {
    const videos = document.querySelectorAll('.js-plyr-video');
    videos.forEach(video => {
      // Check if the current video is not the one playing
      if (video !== currentEl && video.plyr) {
        video.plyr.pause();
      }
    });
  }
});
;// CONCATENATED MODULE: ./app/classes/Media.js





gsapWithCSS.registerPlugin(ScrollTrigger.ScrollTrigger, ScrollSmoother.ScrollSmoother, ScrollToPlugin.ScrollToPlugin);


/* harmony default export */ const Media = (class {
  constructor() {
    this.smooth = false;
    if (this.smooth) {
      this.scrolling = ScrollSmoother.ScrollSmoother.get();
    }
    this.els = {
      intro: document.querySelector('.js-media-intro'),
      header: document.querySelector('.js-media-header'),
      nav: document.querySelector('.js-media-nav'),
      media: document.querySelector('.js-media'),
      back: document.querySelector('.js-media-nav-back'),
      mobileFilters: document.querySelector('.js-media-nav-filters'),
      searchNav: document.querySelector('.js-media-nav-search'),
      searchBtn: document.querySelector('.js-media-nav-search-btn'),
      searchInput: document.querySelector('.js-media-nav-search-input'),
      clearFiltersBtn: document.querySelector('.js-media-nav-clear-filters'),
      navItems: document.querySelectorAll('.js-media-nav-item'),
      navLists: document.querySelectorAll('.js-media-nav-list'),
      navTerms: document.querySelectorAll('.js-media-nav-term'),
      articles: document.querySelectorAll('.js-media-article'),
      articlesImages: document.querySelectorAll('.js-media-article .js-media-image > div'),
      noResults: document.querySelector('.js-no-results')
    };
    this.filters = {
      ['media-brand']: {
        slug: null,
        name: null
      },
      ['media-category']: {
        slug: null,
        name: null
      },
      ['media-date']: {
        slug: null,
        name: null
      }
    };
    document.body.classList.add('is-loaded');
    sortBrands(document.querySelector('.js-media-brands-list'));
    document.querySelectorAll('.js-slide-toggle-item').forEach(el => {
      new BetterSlideToggle(el);
    });
    if (window.innerWidth > 1024) {
      this.addHeaderMouseEvents();
    } else {
      this.initMobileEvents();
    }
    this.addNavEvents();
    this.addSearchEvents();
    this.toggleZoomEvents();
    this.initZoomOffScrollTriggers();
    this.addTargetBlankToLinks();
    document.querySelectorAll('.js-plyr-video').forEach(el => {
      new CustomVideo(el);
    });
    this.followCursorMedia();
    if (this.smooth) {
      this.scrolling.paused(true);
    }
    let self = this;
    setTimeout(() => {
      gsapWithCSS.to(self.els.intro.querySelector('div'), {
        opacity: 0,
        ease: 'ease.out',
        duration: 0.75,
        onComplete: () => {
          gsapWithCSS.to(self.els.intro, {
            opacity: 0,
            ease: 'ease.out',
            duration: 0.5,
            onComplete: () => {
              self.initFirst();
              self.els.intro.style.display = 'none';
            }
          });
        }
      });
    }, 1000);
  }
  setVideoMuteState(shouldMute) {
    const videos = document.querySelectorAll('.js-plyr-video');
    videos.forEach(video => {
      // video.muted = shouldMute;
      video.plyr.muted = shouldMute;
    });
  }
  followCursorMedia() {
    const follower = document.querySelector('.js-cursor-follower');
    const triggers = document.querySelectorAll('.plyr, .js-cursor-follower-trigger');
    if (!follower) return;
    document.addEventListener('mousemove', event => {
      const x = event.clientX;
      const y = event.clientY;
      follower.style.left = `${x}px`;
      follower.style.top = `${y}px`;
    });
    triggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', () => {
        follower.classList.add('is-active');
        if (trigger.classList.contains('plyr--playing')) {
          follower.classList.add('is-played');
        }
      });

      // trigger.addEventListener('mousemove', () => {
      //   if (
      //     trigger.classList.contains('plyr--paused') &&
      //     document.body.classList.contains('is-zoom')
      //   ) {
      //     follower.classList.remove('is-played');
      //   }
      // });

      trigger.addEventListener('mouseleave', () => {
        follower.classList.remove('is-active');
      });
    });
  }
  initFirst() {
    if (window.innerWidth <= 1024) {
      document.body.classList.add('is-init');
      if (this.smooth) {
        this.scrolling.paused(false);
      }
      return;
    }
    document.querySelector('.media-brand .js-media-nav-item-taxonomy').click();

    // clicking outside opened nav closes it
    document.body.addEventListener('click', () => {
      this.closeActiveCategory();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.keyCode === 27) {
        if (document.body.classList.contains('is-zoom')) {
          document.querySelector('.js-media-nav-back').click();
        }
      }
    });
    this.els.navItems.forEach(el => {
      el.querySelector('.js-media-nav-item-taxonomy').addEventListener('click', e => {
        e.stopPropagation();
        document.body.classList.add('has-nav-init');
        if (el.closest('.js-media-nav-item').classList.contains('is-active')) {
          gsapWithCSS.to(this.els.media, {
            opacity: 0.3,
            duration: 0.5,
            ease: 'power1.out',
            pointerEvents: 'none'
          });
        } else {
          gsapWithCSS.to(this.els.media, {
            opacity: 1,
            duration: 0.5,
            delay: 0.3,
            ease: 'power1.in',
            pointerEvents: 'auto'
          });
        }
      });
    });
    document.body.classList.add('is-init');
    if (this.smooth) {
      this.scrolling.paused(false);
    }
    setTimeout(() => {
      window.addEventListener('scroll', e => {
        if (document.body.classList.contains('has-nav-init')) return;
        document.querySelector('.media-brand .js-media-nav-item-taxonomy').click();
      });
    }, 350);
  }
  initMobileEvents() {
    this.els.header.querySelector('.js-media-header-button').addEventListener('click', () => {
      this.els.header.classList.toggle('is-mobile-open');
      this.els.nav.classList.toggle('is-mobile-open');
      document.body.classList.toggle('is-locked');
    });
  }
  addHeaderMouseEvents() {
    let hoverTimer;
    let self = this;
    this.els.header.addEventListener('mouseenter', event => {
      hoverTimer = setTimeout(function () {
        self.els.header.classList.add('is-active');
      }, 150);
    });
    this.els.header.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
      self.els.header.classList.remove('is-active');
    });
  }
  addTargetBlankToLinks() {
    const links = document.querySelectorAll('.media-article__info a');
    links.forEach(link => {
      if (link.getAttribute('target') !== '_blank') {
        link.setAttribute('target', '_blank');
      }
    });
  }
  closeActiveCategory() {
    if (document.querySelector('.js-media-nav-item.is-active')) {
      document.querySelector('.js-media-nav-item.is-active .js-media-nav-item-taxonomy').click();
    }
  }
  addNavEvents() {
    this.els.clearFiltersBtn.addEventListener('click', e => {
      this.clearFilters();
      this.closeActiveCategory();
    });
    this.els.mobileFilters.querySelector('.js-active-media-brand').addEventListener('click', e => {
      this.filters['media-brand'] = {
        slug: null,
        name: null
      };
      document.querySelector('.js-media-nav-item.media-brand .js-media-nav-term.is-filtered').classList.remove('is-filtered');
    });
    this.els.mobileFilters.querySelector('.js-active-media-category').addEventListener('click', e => {
      this.filters['media-category'] = {
        slug: null,
        name: null
      };
      document.querySelector('.js-media-nav-item.media-category .js-media-nav-term.is-filtered').classList.remove('is-filtered');
    });
    this.els.mobileFilters.querySelector('.js-active-media-date').addEventListener('click', e => {
      this.filters['media-date'] = {
        slug: null,
        name: null
      };
      document.querySelector('.js-media-nav-item.media-date .js-media-nav-term.is-filtered').classList.remove('is-filtered');
    });
    this.els.mobileFilters.addEventListener('click', e => {
      this.displayActiveFilters();
      this.filterPosts();
    });
    this.els.navTerms.forEach(el => {
      el.addEventListener('mouseenter', e => {
        el.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', e => {
        el.classList.remove('is-hovering');
      });
      el.addEventListener('click', () => {
        const term = el.dataset.term;
        const termName = el.dataset.name;
        const taxonomy = el.closest('.js-media-nav-list').dataset.taxonomy;
        const item = el.closest('.js-media-nav-item');

        // toggle is-filtered class
        item.querySelectorAll('.is-filtered').forEach(filteredEl => {
          if (el !== filteredEl) {
            filteredEl.classList.remove('is-filtered');
          } else {}
        });
        el.classList.toggle('is-filtered');

        // close nav item if filter is selected
        if (item.querySelector('.is-filtered')) {
          item.querySelector('.js-media-nav-item-taxonomy').click();
        }
        this.filters[taxonomy].slug = el.classList.contains('is-filtered') ? term : null;
        this.filters[taxonomy].name = el.classList.contains('is-filtered') ? termName : null;
        this.displayActiveFilters();
        this.filterPosts();
      });
    });
  }
  displayActiveFilters() {
    document.querySelectorAll('.js-active-media-brand').forEach(item => {
      item.dataset.filter = this.filters['media-brand'].name;
    });
    document.querySelectorAll('.js-active-media-category').forEach(item => {
      item.dataset.filter = this.filters['media-category'].name;
    });
    document.querySelectorAll('.js-active-media-date').forEach(item => {
      item.dataset.filter = this.filters['media-date'].name;
    });
  }
  clearFilters() {
    document.querySelectorAll('.js-media-nav .is-filtered').forEach(el => {
      el.classList.remove('is-filtered');
    });
    this.filters = {
      ['media-brand']: {
        slug: null,
        name: null
      },
      ['media-category']: {
        slug: null,
        name: null
      },
      ['media-date']: {
        slug: null,
        name: null
      }
    };
    this.displayActiveFilters();
    this.filterPosts();
    this.els.mobileFilters.classList.remove('is-active');
  }
  showAllPosts() {
    const allPosts = this.els.media.querySelectorAll(`.js-media-article`);
    gsapWithCSS.to(this.els.media, {
      opacity: 0,
      ease: 'power1.out',
      duration: 0.5,
      onComplete: () => {
        allPosts.forEach(el => {
          el.classList.add('is-visible');
        });
        ScrollTrigger.ScrollTrigger.refresh();
        if (this.smooth) {
          this.scrolling.scrollTo(0);
        }
        gsapWithCSS.to(this.els.media, {
          opacity: 1,
          ease: 'power1.in',
          duration: 0.5
        });
      }
    });
  }
  hideAllPosts(refresh = true) {
    const allPosts = this.els.media.querySelectorAll(`.js-media-article`);
    allPosts.forEach(el => {
      el.classList.remove('is-visible');
    });
    if (refresh) {
      ScrollTrigger.ScrollTrigger.refresh();
    }
  }
  filterPosts() {
    let query = `.js-media-article`;
    this.els.searchInput.value = '';
    document.querySelector('.js-active-search').setAttribute('data-search', '');
    this.els.searchNav.classList.remove('is-focused', 'has-found', 'no-results');
    const brand = this.filters['media-brand'].slug;
    const category = this.filters['media-category'].slug;
    const date = this.filters['media-date'].slug;
    if (brand) {
      query += `[data-media-brand*="${brand}"]`;
    }
    if (category) {
      query += `[data-media-category*="${category}"]`;
    }
    if (date) {
      query += `[data-media-date*="${date}"]`;
    }
    if (brand == null && category == null & date == null) {
      document.body.classList.remove('is-filtering');
    } else {
      document.body.classList.add('is-filtering');
      if (window.innerWidth <= 1024) {
        setTimeout(() => {
          document.querySelector('.js-media-header-button').click();
        }, 300);
      }
    }
    const selectedPosts = this.els.media.querySelectorAll(query);
    this.showSelectedPosts(selectedPosts);
    if (!selectedPosts.length) {
      gsapWithCSS.to(this.els.noResults, {
        opacity: 1,
        delay: 0.3
      });
    } else {
      gsapWithCSS.to(this.els.noResults, {
        opacity: 0
      });
    }
  }
  showSelectedPosts(selectedPosts) {
    gsapWithCSS.to(this.els.articles, {
      opacity: 0,
      onComplete: () => {
        this.hideAllPosts(false);
        selectedPosts.forEach(el => {
          el.classList.add('is-visible');
        });
        ScrollTrigger.ScrollTrigger.refresh();
        if (this.smooth) {
          this.scrolling.scrollTo(0);
        }
        gsapWithCSS.to(this.els.articles, {
          opacity: 1,
          delay: 0.3
        });
      }
    });
  }
  addSearchEvents() {
    this.els.searchBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (this.els.searchNav.classList.contains('is-searching')) {
        if (this.els.searchNav.classList.contains('has-found') || this.els.searchNav.classList.contains('no-results')) {
          this.els.searchNav.classList.remove('has-found', 'no-results');
          this.els.searchInput.value = '';
          this.els.searchInput.click();
          this.els.searchInput.focus();
          this.clearFilters();
        } else if (this.els.searchInput.value != '') {
          this.searchPosts(this.els.searchInput.value);
        }
      } else {
        this.els.searchNav.classList.add('is-searching');
        this.els.searchInput.click();
        this.els.searchInput.focus();
        this.els.searchNav.scrollIntoView({
          behavior: 'instant',
          block: 'end'
        });
      }
    });
    document.body.addEventListener('click', e => {
      if (this.els.searchInput.value == '') {
        this.els.searchNav.classList.remove('is-searching');
      }
    });
    this.els.searchInput.addEventListener('click', e => {
      e.stopPropagation();
      this.els.searchNav.classList.add('is-focused', 'is-searching');
    });
    this.els.searchInput.addEventListener('click', e => {
      e.stopPropagation();
    });
    this.els.searchInput.addEventListener('keyup', e => {
      this.els.searchNav.classList.remove('has-found', 'no-results');
      if (this.els.searchInput.value == '') {
        this.clearFilters();
      }
      if (e.key === 'Enter' || e.keyCode === 13) {
        this.searchPosts(this.els.searchInput.value);
      }
    });
  }
  searchPosts(term) {
    document.querySelector('.js-active-search').setAttribute('data-search', term);
    const searchResults = this.els.media.querySelectorAll(`.js-media-article[data-search*="${term.toLowerCase()}"]`);
    if (searchResults.length === 0) {
      this.els.searchNav.classList.remove('has-found');
      this.els.searchNav.classList.add('no-results');
      this.showSelectedPosts(searchResults);
      gsapWithCSS.to(this.els.noResults, {
        opacity: 1,
        delay: 0.3
      });
      return;
    } else {
      gsapWithCSS.to(this.els.noResults, {
        opacity: 0
      });
    }
    setTimeout(() => {
      document.querySelector('.js-media-header-button').click();
    }, 300);
    this.els.searchNav.classList.remove('no-results');
    this.els.searchNav.classList.add('has-found');
    gsapWithCSS.to(this.els.articles, {
      opacity: 0,
      onComplete: () => {
        this.hideAllPosts(false);
        searchResults.forEach(el => {
          el.classList.add('is-visible');
        });
        ScrollTrigger.ScrollTrigger.refresh();
        if (this.smooth) {
          this.scrolling.scrollTo(0);
        }
        gsapWithCSS.to(this.els.articles, {
          opacity: 1,
          delay: 0.3
        });
      }
    });
  }
  initZoomOffScrollTriggers() {
    this.els.articles.forEach(el => {
      const header = el.querySelector('header');
      const firstElement = el.querySelector('.js-media-image:first-child');
      const lastElement = el.querySelector('.js-media-image:last-child');
      if (firstElement === lastElement) return;
      ScrollTrigger.ScrollTrigger.create({
        trigger: header,
        start: `center 50%`,
        endTrigger: lastElement,
        end: `center 50%`,
        pin: true,
        pinType: document.querySelector('.js-scrollable').style.transform ? 'transform' : 'fixed'
      });
    });
  }
  toggleZoomEvents() {
    let zoomVars = {
      in: '45vw',
      out: '25.7vw',
      ratioIn: undefined,
      ratioOut: undefined
    };
    function calculateZoomVars() {
      if (window.innerWidth <= 1400) {
        zoomVars.in = 600;
        zoomVars.out = 360;
      }
      if (window.innerWidth <= 768) {
        zoomVars.in = '100vw';
        zoomVars.out = 360;
        zoomVars.paddingTop = document.querySelector('.js-media-content').style.paddingTop;
      }
      if (window.innerWidth <= 600) {
        zoomVars.out = 260;
      }
      zoomVars.ratioIn = parseFloat(zoomVars.in) / parseFloat(zoomVars.out);
      zoomVars.ratioOut = parseFloat(zoomVars.out) / parseFloat(zoomVars.in);
      if (window.innerWidth <= 768) {
        zoomVars.ratioIn = window.innerWidth / parseFloat(zoomVars.out);
        zoomVars.ratioOut = parseFloat(zoomVars.out) / window.innerWidth;
      }
    }
    function closeZoom() {
      if (this.els.media.classList.contains('is-zooming')) return;
      this.els.media.classList.add('is-zooming');
      this.els.nav.classList.add('is-zooming');
      calculateZoomVars();
      gsapWithCSS.to(this.els.media.querySelectorAll('.js-image, .js-media-video'), {
        width: zoomVars.out,
        duration: 0.5,
        ease: 'ease.in',
        onStart: () => {
          gsapWithCSS.set('.js-media-article-header', {
            opacity: 0
          });
        },
        onComplete: () => {
          document.body.classList.remove('is-zoom');
          this.els.nav.classList.remove('is-zooming', 'is-zoom');
          this.els.media.classList.remove('is-zooming', 'is-zoom');
          document.querySelector('.js-cursor-follower').classList.remove('is-played');
          ScrollTrigger.ScrollTrigger.refresh();
          this.setVideoMuteState(true);
          gsapWithCSS.to('.js-media-article-header', {
            opacity: 1,
            duration: 0.5
          });
        }
      });
      gsapWithCSS.to(window, {
        scrollTo: window.pageYOffset * zoomVars.ratioOut,
        duration: 0.5,
        ease: 'ease.out'
      });
      if (window.innerWidth <= 768) {
        gsapWithCSS.to('.js-media-content', {
          paddingTop: 'max(16vw, 30svh)',
          duration: 0.5,
          ease: 'ease.out'
        });
      }
    }
    this.els.articlesImages.forEach(el => {
      el.addEventListener('click', () => {
        if (this.els.media.classList.contains('is-zoom')) return;
        this.els.media.classList.add('is-zoom', 'is-zooming');
        this.els.nav.classList.add('is-zoom', 'is-zooming');
        document.body.classList.add('is-zoom');
        this.setVideoMuteState(false);
        calculateZoomVars();
        gsapWithCSS.to(this.els.media.querySelectorAll('.js-image, .js-media-video'), {
          width: zoomVars.in,
          ease: 'ease.in',
          transformOrigin: 'center',
          duration: 0.5,
          onStart: () => {
            gsapWithCSS.set('.js-media-article-header', {
              opacity: 0
            });
            if (window.innerWidth <= 768) {
              gsapWithCSS.to('.js-media-content', {
                paddingTop: 0,
                duration: 0.5,
                ease: 'ease.in'
              });
            }
          },
          onComplete: () => {
            this.els.nav.classList.remove('is-zooming');
            this.els.media.classList.remove('is-zooming');
            ScrollTrigger.ScrollTrigger.refresh();
            gsapWithCSS.to('.js-media-article-header', {
              opacity: 1,
              duration: 0.5
            });
          }
        });
        gsapWithCSS.to(window, {
          scrollTo: window.pageYOffset * zoomVars.ratioIn,
          duration: 0.5,
          ease: 'ease.out'
        });
      });
    });
    this.els.back.addEventListener('click', closeZoom.bind(this));
  }
});
;// CONCATENATED MODULE: ./app/index.js





gsapWithCSS.registerPlugin(ScrollTrigger.ScrollTrigger, ScrollSmoother.ScrollSmoother);








class App {
  constructor() {
    // this.createScrolling();
    this.checkTouchScreen();
    if (document.querySelector('.js-intro')) {
      this.createScrolling();
      window.innerWidth > SIZES.breakpoint && this.createLoop();
      this.createSections();
      this.initMediaPopup();
      this.initMediaSection();
    } else if (document.querySelector('.js-media')) {
      this.initMedia();
    }
    this.initLazyImages();
    if (document.querySelector('.js-intro')) {
      this.followCursor();
    }
    const desktop = window.matchMedia(`screen and (min-width: ${SIZES.breakpoint + 1}px)`);
    const mobile = window.matchMedia(`screen and (max-width: ${SIZES.breakpoint}px)`);
    desktop.addListener(function (e) {
      if (e.matches) {
        location.reload();
      }
    });
    mobile.addListener(function (e) {
      if (e.matches) {
        location.reload();
      }
    });
    document.body.classList.remove('is-preloading');
  }
  followCursor() {
    const follower = document.querySelector('.js-cursor-follower');
    const triggers = document.querySelectorAll('.js-cursor-follower-trigger');
    if (!follower) return;
    document.addEventListener('mousemove', event => {
      const x = event.clientX;
      const y = event.clientY;
      follower.style.left = `${x}px`;
      follower.style.top = `${y}px`;
    });
    triggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', () => {
        follower.classList.add('is-active');
      });
      trigger.addEventListener('mouseleave', () => {
        follower.classList.remove('is-active');
      });
    });
  }
  checkTouchScreen() {
    if ('ontouchstart' in document.documentElement) {
      document.body.classList.add('is-touch-screen');
    } else {
      document.body.classList.add('has-hover');
    }
    if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent)) {
      document.body.classList.add('is-safari');
    }
  }
  createLoop() {
    ScrollTrigger.ScrollTrigger.create({
      start: 0,
      end: 'max',
      onLeave: self => {
        self.scroll(1, false);
        if (this.projects) {
          this.projects.reloadProjects();
          // this.navigation.initDesktopColorToggle();
        }

        ScrollTrigger.ScrollTrigger.refresh();
        ScrollTrigger.ScrollTrigger.update();
      },
      onLeaveBack: self => {
        self.scroll(ScrollTrigger.ScrollTrigger.maxScroll(window) - 1, false);
        ScrollTrigger.ScrollTrigger.refresh();
        ScrollTrigger.ScrollTrigger.update();
      }
    });
    let lastScrollTop = 0;
    window.addEventListener('scroll', function (e) {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        // down
        document.body.scrollingDown = true;
      } else {
        // up
        document.body.scrollingDown = false;
      }
      lastScrollTop = st <= 0 ? 0 : st;
    }, false);
  }
  createScrolling() {
    this.scrolling = ScrollSmoother.ScrollSmoother.create({
      smooth: window.innerWidth > SIZES.breakpoint ? 1 : false,
      effects: window.innerWidth > SIZES.breakpoint,
      smoothTouch: window.innerWidth > 992 ? 0.1 : false,
      normalizeScroll: true
    });
  }
  initMediaPopup() {
    const popup = document.querySelector('.js-media-popup');
    const popupClose = document.querySelector('.js-media-popup-close');
    const isPopupClosed = localStorage.getItem('mediaPopupClosed');
    if (isPopupClosed) {
      popup.classList.add('is-hidden');
    } else {
      gsapWithCSS.to(popup, {
        y: 0,
        delay: 2,
        duration: 0.8,
        ease: 'ease.out'
      });
    }
    popupClose.addEventListener('click', e => {
      localStorage.setItem('mediaPopupClosed', true);
      gsapWithCSS.to(popup, {
        y: window.innerWidth > SIZES.breakpoint ? '100%' : '-100%',
        duration: 0.4,
        ease: 'ease.in',
        onComplete: () => {
          popup.style.display = 'none';
        }
      });
    });
  }
  initMedia() {
    this.media = new Media();
  }
  initMediaSection() {
    ScrollTrigger.ScrollTrigger.create({
      trigger: document.querySelector('.js-media-section-header'),
      start: '50% 50%',
      endTrigger: document.querySelector('.js-media-section'),
      end: '80% 50%',
      pin: true,
      pinSpacing: false
    });
  }
  createSections() {
    this.intro = new Intro();
    this.agency = new Agency();
    this.curation = new Curation();
    this.projects = new Projects();
    this.services = new Services();
    this.navigation = new Navigation();
  }
  initLazyImages() {
    in_view_min_default()('.js-lazy-image').on('enter', el => {
      let imgSrc = el.dataset.src;
      el.setAttribute('src', imgSrc);
      imagesloaded_default()(el, function (instance) {
        el.classList.add('is-inview', 'is-loaded');
      }).on('exit', el => {
        el.classList.remove('is-inview');
      });
    });
    in_view_min_default()('.js-image').on('enter', el => {
      let img = el.querySelector('img');
      let imgSrc = img.dataset.src;
      img.setAttribute('src', imgSrc);
      imagesloaded_default()(el, function (instance) {
        el.classList.add('is-inview', 'is-loaded');
      });
    }).on('exit', el => {});
    in_view_min_default()('.js-video').on('enter', el => {
      let video = el.querySelector('video');
      video.play();
    }).on('exit', el => {
      let video = el.querySelector('video');
      video.pause();
    });
    in_view_min_default()('.js-images-container').on('enter', el => {
      document.querySelectorAll('.image').forEach(el => {
        let img = el.querySelector('img');
        let imgSrc = img.dataset.src;
        img.setAttribute('src', imgSrc);
        imagesloaded_default()(el, function (instance) {
          el.classList.add('is-inview', 'is-loaded');
        });
      });
    });
  }
}
new App();
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// extracted by mini-css-extract-plugin

})();

/******/ })()
;