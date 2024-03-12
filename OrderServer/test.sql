-- Tạo bảng Doc_gia
CREATE TABLE Doc_gia (
    Ma_doc_gia INT PRIMARY KEY AUTO_INCREMENT,
    Ho_ten VARCHAR(255) NOT NULL,
    Ngay_sinh DATE
);

-- Tạo bảng Sach
CREATE TABLE Sach (
    Ma_sach INT PRIMARY KEY AUTO_INCREMENT,
    Ten_sach VARCHAR(255) NOT NULL,
    Tac_gia VARCHAR(255),
    So_luong INT
);

-- Tạo bảng Muon_sach
CREATE TABLE Muon_sach (
    Ma_phieu_muon INT PRIMARY KEY AUTO_INCREMENT,
    Ma_doc_gia INT,
    Ngay_muon DATE,
    FOREIGN KEY (Ma_doc_gia) REFERENCES Doc_gia(Ma_doc_gia)
);

-- Tạo bảng Chi_tiet_phieu_muon
CREATE TABLE Chi_tiet_phieu_muon (
    Ma_phieu_muon INT,
    Ma_sach INT,
    Ngay_tra DATE,
    PRIMARY KEY (Ma_phieu_muon, Ma_sach),
    FOREIGN KEY (Ma_phieu_muon) REFERENCES Muon_sach(Ma_phieu_muon),
    FOREIGN KEY (Ma_sach) REFERENCES Sach(Ma_sach)
);