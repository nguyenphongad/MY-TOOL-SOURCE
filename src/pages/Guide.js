import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { itemVariants } from '../components/AnimationConfig';
import downloadData from '../assets/data/download-data.json';

const Guide = () => {
  // Lấy phiên bản mới nhất
  const latestVersion = downloadData.toolVersions.find(version => version.isLatest);

  return (
    <PageTransition>
      <motion.h1
        className="page-title"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Hướng Dẫn Cài Đặt
      </motion.h1>

      {/* Phần giới thiệu phiên bản mới nhất */}
      <motion.div
        className="content-section highlight-box"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }}
      >
        <h2>❤️ GIỚI THIỆU BẢN CẬP NHẬT {latestVersion.version.toUpperCase()}</h2>
        <ul className="feature-list">
          {latestVersion.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <p>Yêu cầu hệ thống: <strong>{latestVersion.requirements}</strong></p>
      </motion.div>

      {/* Phần hướng dẫn */}
      <motion.div
        className="content-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.25 }}
      >
        <h2>CHO AI CHƯA TỪNG TẢI TOOL THEO HD DƯỚI</h2>
        <h3>CÁCH CÀI SETUP CÂU LỆNH AUTO MY TOOL:</h3>
        <p className="important-note">(CHỈ ANDROID HỖ TRỢ CHIA MÀN HÌNH, IOS KHÔNG CHẠY ĐƯỢC, KHUYẾN KHÍCH ANDROID 11-)</p>

        <div className="instruction-steps">
          <div className="instruction-step">
            <div className="step-number">B1</div>
            <div className="step-content">
              Tải termux qua CH PLAY GOOGLE <span className="note">(đã tải rồi thì bỏ qua bước trên)</span>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B2</div>
            <div className="step-content">
              Download tool ( Tải qua trang <Link to="/download">Tải Tool</Link>)
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B3</div>
            <div className="step-content">
              Vô Zarchiver, tìm đến thư mục download, giải nén MY_TOOL_{latestVersion.version.toUpperCase()}.rar tại vị trí hiện tại (click vào file ấn giải nén tại đây).
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B4</div>
            <div className="step-content">
              Vô termux nhập: <code>termux-setup-storage</code> sẽ tự động mở cài đặt và cấp quyền thư mục cho ứng dụng termux trong cài đặt app termux.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B5</div>
            <div className="step-content">
              Vô termux nhập: <code>pkg install openjdk-21</code> <span className="note">(chạy đến hỏi continute thì nhập y rồi enter)</span>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B6</div>
            <div className="step-content">
              Cài môi trường trên xong thì nhập câu lệnh: <code>cd /sdcard/download/MY_TOOL_{latestVersion.version.toUpperCase()} && java -jar Run.jar</code>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B7</div>
            <div className="step-content">
              Nhập key (thuê key vip ib admin hoặc lấy key free (link rút gọn, hạn 1 ngày)), chọn chức năng sau đó nhập token, user rồi chọn acc tiktok (golike) và nhập delay, chia màn hình setup auto click đúng nút follow và treo.
            </div>
          </div>
        </div>

        <p className="important-note">Mỗi lần chạy tool sau khi dừng, nhập : 
          <code>java -jar Run.jar</code> 
          để chạy lại tool, không cần nhập lại câu lệnh cài đặt môi trường nữa.
        </p>

        <p className="important-note">Gợi ý: Tool để 12s. Auto click để 9s tránh bị nhả follow</p>

        <hr className="divider" />

        <h3>❤️ HƯỚNG DẪN TẢI VÀ CẬP NHẬT BẢN {latestVersion.version.toUpperCase()}</h3>
        <div className="instruction-steps">
          <div className="instruction-step">
            <div className="step-number">B1</div>
            <div className="step-content">
              Vào trang <Link to="/download">Tải Tool</Link>, tìm phiên bản mới nhất và tải xuống
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B2</div>
            <div className="step-content">
              Tải xuống xong vào Zarchiver tìm thư mục download, tìm file MY_TOOL_{latestVersion.version.toUpperCase()}.rar
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B3</div>
            <div className="step-content">
              Click vào file đó rồi ấn Extract here
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B4</div>
            <div className="step-content">
              Vô termux cd sao cho vào (<code>cd /sdcard/download/MY_TOOL_{latestVersion.version.toUpperCase()}</code>)
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">B5</div>
            <div className="step-content">
              Nhập câu lệnh chạy <code>java -jar Run.jar</code> như bình thường
            </div>
          </div>
        </div>

        <p className="important-note">Gợi ý: Tool để 12s. Auto click để 9s là ổn định nhất tránh bị nhả</p>

        <div className="extra-note">
          <h4>Để dừng chương trình tool</h4>
          <p>Ấn Ctrl trên termux + nhập chữ c trên bàn phím để dừng chương trình termux</p>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default Guide;
