import { LoanProduct, TestimonialItem, FaqItem } from '../types';

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'upper-hhb-tax',
    title: 'Gói Vốn Thuế Nâng Cao (Upper HHB - TAX)',
    badge: 'ĐẶC QUYỀN VỐN LỚN • KHÔNG GIỮ GIẤY TỜ GỐC',
    maxLimit: 'ĐẾN 2 TỶ ĐỒNG',
    highlight: 'KHÔNG giữ giấy tờ gốc – Chấp nhận BĐS đang thế chấp ở ngân hàng khác',
    interestRate: 'Từ 19% - 26%/năm (Dư nợ giảm dần)',
    condition: 'Chủ DN/Cổ đông >= 30% hoặc Hộ KD hoạt động >= 12 tháng, có đóng thuế TNCN/VAT',
    bulletPoints: [
      'Hạn mức cấp vốn từ 500 Triệu đến 2 Tỷ Đồng đáp ứng nhu cầu mở rộng kinh doanh',
      'Đột phá: Không giữ giấy tờ gốc, chỉ cần bản sao/ảnh chụp đối chiếu tính pháp lý',
      'Bất động sản đang thế chấp vay tại ngân hàng khác vẫn được xem xét cấp tín dụng tín chấp',
      'Lãi suất cạnh tranh tính trên dư nợ giảm dần thực tế, giảm áp lực trả nợ hàng tháng',
      'Hồ sơ tinh gọn: Giấy phép KD/ĐKKD + Chứng từ nộp thuế định kỳ'
    ],
    recommendedFor: 'Chủ DN TNHH/Cổ phần & Hộ kinh doanh lớn cần vốn nhập hàng, mở rộng quy mô',
    popular: true
  },
  {
    id: 'tax-plus',
    title: 'Gói Tín Dụng Thuế Doanh Nghiệp (Tax Plus)',
    badge: 'TÍN CHẤP DOANH NGHIỆP • KHÔNG CẦN THẾ CHẤP',
    maxLimit: '50 TR – 500 TRIỆU ĐỒNG',
    highlight: 'Không cần Sổ đỏ đối chiếu – Duyệt trực tiếp theo biên lai thuế 12 tháng',
    interestRate: 'Từ 20% - 25%/năm (Dư nợ giảm dần)',
    condition: 'Cá nhân làm chủ hoặc kinh doanh có nộp thuế TNCN/Thuế môn bài/Thuế khoán 12 tháng',
    bulletPoints: [
      'Không yêu cầu tài sản thế chấp, không cần đối chiếu sổ đỏ',
      'Định mức hạn mức linh hoạt theo doanh số thuế thực đóng',
      'Thời gian xử lý nhanh chóng: Thông báo kết quả thẩm định sơ bộ trong 24h làm việc',
      'Thời hạn vay linh hoạt: 12 - 36 tháng, trả góp định kỳ phù hợp dòng tiền',
      'Hồ sơ đơn giản: Biên lai nộp thuế điện tử eTax hoặc sao kê nộp thuế khoán'
    ],
    recommendedFor: 'Chủ cơ sở buôn bán, tiểu thương, hộ kinh doanh cá thể có đóng thuế'
  },
  {
    id: 'upper-casa',
    title: 'Gói Vốn Dòng Tiền Tài Khoản (Upper CASA)',
    badge: 'DUYỆT THEO DÒNG TIỀN XOAY VÒNG',
    maxLimit: 'LÊN TỚI 1 TỶ ĐỒNG',
    highlight: 'Dựa trên số dư bình quân 6 tháng tại Techcombank, Vietcombank, VPBank...',
    interestRate: 'Từ 19%/năm (Dư nợ giảm dần)',
    condition: 'Số dư bình quân (SDBQ) tài khoản ngân hàng từ 100 triệu/tháng trở lên',
    bulletPoints: [
      'Thẩm định hồ sơ số hóa linh hoạt, giảm thiểu các khâu thực địa phiền hà',
      'Chấp nhận sao kê luân chuyển tiền từ các ngân hàng thương mại uy tín (Tech, VCB, MB, ACB...)',
      'Hạn mức linh hoạt lên đến 1 Tỷ Đồng cấp thành hạn mức thấu chi hoặc trả góp',
      'Đánh giá sức khỏe dòng tiền thực tế qua lịch sử giao dịch thanh toán',
      'Phê duyệt và giải ngân trong 24h - 48h làm việc sau khi tiếp nhận đủ hồ sơ'
    ],
    recommendedFor: 'Doanh nghiệp & Thương nhân có dòng tiền vào ra đều đặn qua tài khoản'
  },
  {
    id: 'ecommerce',
    title: 'Gói Vốn Chủ Shop E-Commerce',
    badge: 'DÀNH RIÊNG CHO SHOP ONLINE',
    maxLimit: 'LÊN TỚI 1 TỶ ĐỒNG',
    highlight: 'Duyệt dựa trên doanh số sàn Shopee, TikTok Shop, Lazada',
    interestRate: 'Từ 19.5%/năm (Dư nợ giảm dần)',
    condition: 'Shop hoạt động >= 6 tháng, doanh số bán/nhập hàng >= 100 triệu/tháng',
    bulletPoints: [
      'Chỉ cần xuất báo cáo doanh thu từ Seller Center hoặc sao kê ví sàn',
      'Giải ngân trực tiếp vào tài khoản ngân hàng để kịp thời gom hàng, nhập kho',
      'Quy trình đối chiếu số hóa tiện lợi, chuyên viên VPBank hỗ trợ tận tình',
      'Thời gian trả góp linh hoạt khớp với chu kỳ thanh toán rút tiền của sàn'
    ],
    recommendedFor: 'Nhà bán hàng Shopee, TikTok Shop, Lazada cần vốn trữ kho đợt cao điểm'
  }
];

export const COMPARISON_DATA = [
  {
    criteria: 'Giữ bản gốc Sổ đỏ / Giấy tờ đất',
    traditional: 'BẮT BUỘC nộp bản gốc, bị phong tỏa tại quầy',
    vpbank: 'KHÔNG GIỮ GIẤY TỜ GỐC (Chỉ chụp đối chiếu thông tin)',
    advantage: true
  },
  {
    criteria: 'Tình trạng Sổ đỏ đang thế chấp bank khác',
    traditional: 'Khó vay thêm nếu tài sản đã hết hạn mức thế chấp',
    vpbank: 'HỖ TRỢ CẤP TÍN CHẤP BỔ SUNG (Hạn mức đến 2 TỶ theo thuế)',
    advantage: true
  },
  {
    criteria: 'Thời gian xét duyệt & giải ngân',
    traditional: '15 – 30 ngày (Nhiều khâu phòng ban kéo dài)',
    vpbank: '24H - 48H LÀM VIỆC (Quy trình thẩm định số hóa tinh gọn)',
    advantage: true
  },
  {
    criteria: 'Yêu cầu Báo cáo tài chính & Sách vở',
    traditional: 'Bắt buộc báo cáo tài chính có lãi, kiểm toán khắt khe',
    vpbank: 'LINH HOẠT: Chỉ cần Biên lai thuế VAT/TNCN hoặc Sao kê CASA',
    advantage: true
  },
  {
    criteria: 'Phương thức tính lãi & Trả nợ',
    traditional: 'Phí phạt trả trước hạn cao (3-5%), thủ tục khó',
    vpbank: 'Tính trên DƯ NỢ GIẢM DẦN, giảm tải lãi vay hàng tháng',
    advantage: true
  },
  {
    criteria: 'Thẩm định thực tế & Định giá BĐS',
    traditional: 'Mất phí định giá 3 - 7 triệu, nhiều đợt kiểm tra',
    vpbank: 'MIỄN PHÍ THẨM ĐỊNH – Cán bộ VPBank tư vấn tận nơi theo chuẩn ngân hàng',
    advantage: true
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Anh Nguyễn Văn Hoàng',
    title: 'Giám đốc Điều hành',
    businessName: 'Công ty CP Kỹ thuật & Thiết bị Điện H.P',
    location: 'Khu Công Nghiệp Quế Võ, Bắc Ninh',
    amountApproved: '1.5 TỶ ĐỒNG',
    disbursementTime: 'Giải ngân sau 24h - 48h làm việc',
    quote: 'Tôi đang có hợp đồng cung ứng phụ tùng đột xuất cho nhà máy FDI ở Quế Võ, cần 1.5 tỷ nhập container linh kiện. Khổ nỗi sổ đỏ duy nhất của gia đình đã thế chấp Vietcombank để xây xưởng. May mắn được chuyên viên VPBank hỗ trợ gói Vay Thuế: chỉ cần bản sao sổ đỏ và biên lai nộp thuế VAT, ngân hàng đã hoàn tất thẩm định và giải ngân đúng hẹn mà không hề giữ lại giấy tờ gốc!',
    documentUsed: 'Biên lai nộp thuế VAT + Ảnh chụp Sổ đỏ thế chấp VCB',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'test-2',
    name: 'Chị Trần Thu Hương',
    title: 'Chủ Hộ Kinh Doanh',
    businessName: 'Chuỗi Trang Sức & Phụ Kiện Cao Cấp Hương Jewelry',
    location: 'Phố Cổ Hoàn Kiếm & Cầu Giấy, Hà Nội',
    amountApproved: '850 TRIỆU ĐỒNG',
    disbursementTime: 'Giải ngân sau 24h làm việc',
    quote: 'Làm tiệm kinh doanh thời trang và vàng bạc, thời điểm gom hàng cuối năm cần vốn lưu động. Tôi lo thủ tục ngân hàng phức tạp, nhưng chuyên viên VPBank trực tiếp đến tận cửa hàng, hướng dẫn hồ sơ thuế khoán và giấy phép hộ kinh doanh rất nhanh gọn, minh bạch. Hồ sơ được phê duyệt và giải ngân 850 triệu đồng trực tiếp vào tài khoản công ty.',
    documentUsed: 'Biên lai thuế khoán + Giấy phép Hộ kinh doanh cá thể',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'test-3',
    name: 'Anh Lê Minh Đức',
    title: 'Nhà sáng lập / Tổng kho E-Commerce',
    businessName: 'Hệ Thống Phân Phối Đồ Gia Dụng SmartLife',
    location: 'Quận Long Biên, Hà Nội & Giao hàng Toàn quốc',
    amountApproved: '1.2 TỶ ĐỒNG',
    disbursementTime: 'Duyệt trong 24h - 48h',
    quote: 'Shop tôi bán trên Shopee và TikTok Shop có dòng tiền đều, nhưng đọng vốn ở chu kỳ thanh toán khi cần nhập kho hàng Tết. Chuyên viên VPBank dựa trên sao kê tài khoản ngân hàng và doanh số sàn, xét duyệt hạn mức 1.2 tỷ đồng. Lãi suất tính trên dư nợ giảm dần rõ ràng, hợp đồng tín dụng ngân hàng minh bạch và chuẩn chỉ.',
    documentUsed: 'Sao kê dòng tiền CASA 6 tháng + Báo cáo doanh số sàn',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Sổ đỏ của tôi đang thế chấp ở ngân hàng khác có vay được không?',
    answer: 'HOÀN TOÀN ĐƯỢC! Đây là cơ chế cấp tín dụng tín chấp đặc thù của VPBank dành cho Khách hàng Doanh nghiệp và Hộ kinh doanh. Do sản phẩm đánh giá dựa trên năng lực doanh thu thuế và dòng tiền kinh doanh (chứ không phong tỏa giữ bản gốc Sổ đỏ hay đăng ký giao dịch bảo đảm), nên Bất động sản của bạn đang thế chấp vay vốn tại ngân hàng khác (Vietcombank, BIDV, Agribank...) vẫn hoàn toàn hợp lệ để làm căn cứ uy tín nâng hạn mức cấp vốn tín chấp lên tới 2 TỶ ĐỒNG.'
  },
  {
    id: 'faq-2',
    question: 'Doanh nghiệp tôi mới hoạt động trên 12 tháng có vay được 1 tỷ không?',
    answer: 'ĐƯỢC! Điều kiện quy định của VPBank yêu cầu doanh nghiệp có thâm niên hoạt động từ 12 tháng trở lên và người đứng tên có tỷ lệ sở hữu vốn từ 30% hoặc là người đại diện pháp luật. Khi bạn có tờ khai thuế VAT hoặc chứng từ nộp thuế TNCN, ngân hàng sẽ thẩm định năng lực tài chính và phê duyệt hạn mức phù hợp từ 500 triệu đến 1 - 2 tỷ đồng.'
  },
  {
    id: 'faq-3',
    question: 'Tôi chỉ đóng thuế khoán 1,5 triệu/tháng thì được vay bao nhiêu?',
    answer: 'Với mức thuế môn bài hoặc thuế khoán 1,5 triệu/tháng (tương đương 18 triệu/năm), bạn đủ điều kiện tham gia Gói Tín Dụng Thuế Doanh Nghiệp (Tax Plus) hoặc kết hợp sao kê dòng tiền giao dịch tại tài khoản thanh toán. Hạn mức cấp vốn dự kiến từ 100 triệu đến 350 triệu đồng theo hình thức tín chấp không cần tài sản thế chấp.'
  },
  {
    id: 'faq-4',
    question: 'Lãi suất từ 19% - 26%/năm tính trên dư nợ giảm dần có lợi như thế nào?',
    answer: 'Lãi tính trên dư nợ giảm dần là phương thức chuẩn của hệ thống Ngân hàng Nhà nước: tiền lãi mỗi tháng chỉ tính trên số tiền gốc thực tế còn nợ sau khi đã trừ đi phần gốc đã trả các kỳ trước. Càng về sau, số tiền lãi phải trả càng giảm dần, giúp khách hàng tối ưu chi phí vốn và minh bạch tuyệt đối theo Hợp đồng tín dụng chính thức với VPBank, hoàn toàn khác biệt với các bẫy tín dụng đen hay lãi suất mập mờ bên ngoài.'
  },
  {
    id: 'faq-5',
    question: 'Tôi có phải nộp bất kỳ khoản phí hồ sơ hay phí môi giới nào trước không?',
    answer: 'TUYỆT ĐỐI KHÔNG! Toàn bộ quy trình tiếp nhận, tra cứu kiểm tra lịch sử tín dụng CIC và thẩm định tại VPBank là HOÀN TOÀN MIỄN PHÍ. Khách hàng chỉ ký kết hồ sơ tín dụng với Cán bộ chuyên trách chính thức của VPBank tại Chi nhánh/Phòng giao dịch hoặc địa chỉ kinh doanh. VPBank tuyệt đối không ủy quyền thu phí cho bất kỳ cá nhân môi giới hay tổ chức tài chính trung gian nào.'
  }
];

export const HOTLINE = '0359.622.268';
export const HOTLINE_TEL = 'tel:0359622268';
export const ZALO_URL = 'https://zalo.me/0359622268';
