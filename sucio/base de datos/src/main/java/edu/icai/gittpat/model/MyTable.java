package edu.icai.gittpat.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("MY_TABLE")
public class MyTable {
	private @Column("ID") @Id Long id;
	private @Column("NAME") String name;
	private @Column("SURNAME") String surname;
	private @Column("EMAIL") String email;
	private @Column("PASSWORD") String password;
	private @Column("RESUME") String resume;
}

