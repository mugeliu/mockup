class IPhoneMockup extends HTMLElement {
  constructor() {
    super();
    // 使用 Shadow DOM，隔离样式
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* :host 确保自定义元素在外部是 inline-block */
        :host {
          display: inline-block;
        }

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

        /* 4格信号条 */
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
          background: #ffd700; /* 金色 */
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
          flex: 1; /* 占据剩余空间 */
          position: relative;
          padding: 20px;
          overflow-y: auto;
          box-sizing: border-box;
          background: #fff; /* 背景与机身一致 */
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
          <!-- 将外部写在 <iphone-mockup> ... </iphone-mockup> 中的内容插入到这里 -->
          <slot></slot>
        </div>

        <div class="bottom-indicator"></div>
      </div>
    `;
  }
}

// 注册自定义元素
customElements.define('iphone-mockup', IPhoneMockup);
