class IPhoneMockup extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    // ================= 1. 添加外部资源 =================
    // Google Fonts (Roboto)
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
    fontLink.rel = "stylesheet";
    shadowRoot.appendChild(fontLink);

    // Font Awesome
    const faStyle = document.createElement("link");
    faStyle.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    faStyle.rel = "stylesheet";
    shadowRoot.appendChild(faStyle);

    // Material Icons
    const materialIconsLink = document.createElement("link");
    materialIconsLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    materialIconsLink.rel = "stylesheet";
    shadowRoot.appendChild(materialIconsLink);

    // ================= 2. 加载 Tailwind Play CDN =================
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';

    // ================= 3. Tailwind 初始化逻辑 =================
    tailwindScript.onload = () => {
      // 配置 Tailwind 作用域
      window.tailwind.config = {
        content: [this.shadowRoot], // 限定扫描 Shadow DOM
        corePlugins: { preflight: false } // 禁用全局样式重置
      };
      window.tailwind.refresh(); // 强制重新生成样式

      // ================= 4. 插入组件 HTML 和样式 =================
      shadowRoot.innerHTML += `
        <style>
          :host {
            display: inline-block;
            font-family: 'Roboto', sans-serif; /* 应用 Google Font */
          }

          /* Material Icons 字体定义 */
          .material-icons {
            font-family: 'Material Icons';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-smoothing: antialiased;
          }

          /* 自定义样式 */
          .iphone-mockup {
            position: relative;
            width: 390px;
            height: 844px;
            background-color: #fff;
            border-radius: 55px;
            border: 10px solid #1a1a1a;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            margin: 20px;
            display: flex;
            flex-direction: column;
          }

          .status-bar {
            position: relative;
            height: 44px;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            font-weight: 500;
            background-color: #fff;
            flex-shrink: 0;
          }

          .dynamic-island {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 110px;
            height: 32px;
            background-color: #000;
            border-radius: 20px;
            z-index: 2;
          }

          .time {
            font-weight: 600;
            font-size: 16px;
            z-index: 1;
          }

          .status-icons {
            display: flex;
            align-items: center;
            gap: 6px;
            z-index: 1;
          }

          .cellular {
            display: flex;
            align-items: flex-end;
            gap: 2px;
            height: 16px;
          }

          .bar {
            width: 4px;
            background: #000;
            border-radius: 2px;
          }

          .bar:nth-child(1) { height: 4px; }
          .bar:nth-child(2) { height: 8px; }
          .bar:nth-child(3) { height: 12px; }
          .bar:nth-child(4) { height: 16px; opacity: 0.3; }

          .battery {
            width: 27px;
            height: 13px;
            border: 1px solid #000;
            border-radius: 3px;
            position: relative;
            padding: 1px;
          }

          .battery-level {
            height: 100%;
            width: 90%;
            background: #ffd700;
            border-radius: 1px;
          }

          .battery::after {
            content: "";
            position: absolute;
            right: -3px;
            top: 3px;
            height: 7px;
            width: 2px;
            background: #000;
            border-radius: 0 2px 2px 0;
          }

          .content-area {
            flex: 1;
            position: relative;
            padding: 20px;
            overflow-y: auto;
            box-sizing: border-box;
          }

          .bottom-indicator {
            position: relative;
            margin: 8px auto;
            width: 135px;
            height: 5px;
            background: #000;
            border-radius: 3px;
            opacity: 0.3;
            flex-shrink: 0;
          }
        </style>

        <!-- 组件结构 -->
        <div class="iphone-mockup">
          <div class="status-bar">
            <div class="time">23:12</div>
            <div class="dynamic-island"></div>
            <div class="status-icons">
              <div class="cellular">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
              </div>
              <div class="battery">
                <div class="battery-level"></div>
              </div>
            </div>
          </div>
          <div class="content-area">
            <!-- 示例图标组合 -->
            <div class="flex gap-4 p-4">
              <i class="fas fa-mobile-alt text-blue-500 text-xl"></i>
              <span class="material-icons text-green-500">settings</span>
            </div>
            <slot></slot>
          </div>
          <div class="bottom-indicator"></div>
        </div>
      `;
    };

    // ================= 5. 最后加载 Tailwind 脚本 =================
    shadowRoot.appendChild(tailwindScript);
  }
}

// 注册自定义元素
customElements.define('iphone-mockup', IPhoneMockup);
