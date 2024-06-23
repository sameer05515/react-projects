# java program to upload some string text into S3 file

To upload a string text to an S3 file using Java, you can use the AWS SDK for Java. Here's a basic example using the AWS SDK version 2.x:

1. Add the AWS SDK for Java dependency to your project. You can do this by adding the following Maven dependency to your `pom.xml` if you're using Maven:

```xml
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>s3</artifactId>
    <version>2.17.16</version> <!-- Use the latest version -->
</dependency>
```

2. Create a Java class for uploading the string text to an S3 file:

```java
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.ByteArrayInputStream;

public class S3UploadExample {
    public static void main(String[] args) {
        String accessKey = "YOUR_ACCESS_KEY";
        String secretKey = "YOUR_SECRET_KEY";
        String bucketName = "your-bucket-name";
        String key = "path/to/your/file.txt"; // The object key (file path) in S3
        String textToUpload = "This is the text that you want to upload to the S3 file.";

        S3Client s3Client = S3Client.builder()
                .region(Region.US_EAST_1) // Set your desired region
                .credentialsProvider(DefaultCredentialsProvider.builder()
                        .accessKeyId(accessKey)
                        .secretAccessKey(secretKey)
                        .build())
                .build();

        byte[] contentBytes = textToUpload.getBytes();
        ByteArrayInputStream contentStream = new ByteArrayInputStream(contentBytes);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentLength((long) contentBytes.length)
                .contentType("text/plain")
                .build();

        s3Client.putObject(putObjectRequest, contentStream);

        System.out.println("Text uploaded to S3 file: " + key);

        s3Client.close();
    }
}
```

Replace `YOUR_ACCESS_KEY`, `YOUR_SECRET_KEY`, `your-bucket-name`, and adjust the region with your own values.

Please note that handling credentials in your code directly is not recommended in production. Instead, you should use IAM roles or external configuration methods like environment variables or AWS configuration files.



# Write one java program to get all text inside [..] in below given lines of string

```
[PKG-130] 1. Goals: DMW Goals landing - JIRA (atlassian.net)
[PKG-131] 2. Goals: Create qualitative or quantitative goals & general details - JIRA (atlassian.net)
[PKG-132] 3. Goals: Link targets with qualitative goals - JIRA (atlassian.net)
[PKG-133] 4. Goals: Link targets with quantitative goals - JIRA (atlassian.net)
[PKG-743] 5. Goals: Linking UNSDG, SBTi & PKG Forward initiatives - JIRA (atlassian.net)
[PKG-744] 6. Goals: Goal details UI - JIRA (atlassian.net)
[PKG-745] 7. Goals: Goal details & target progress in DMW - JIRA (atlassian.net)
[PKG-746] 8. Goals: UNSDG Snapshot - JIRA (atlassian.net)
[PKG-747] 9. Metric: Metric landing DMW - JIRA (atlassian.net)
[PKG-748] 10. Metric: Add new derived metric - JIRA (atlassian.net)
[PKG-749] 11. Metric: Add new data category metric - JIRA (atlassian.net)
[PKG-750] 12. Metric: View metric progress in DMW - JIRA (atlassian.net)
[PKG-751] 13. Metric: Metric landing UI - JIRA (atlassian.net)
[PKG-826] 14. Metric: View metric progress in UI - JIRA (atlassian.net)
[PKG-827] 15. Initiatives: Initiatives landing DMW - JIRA (atlassian.net)
[PKG-828] 16. Initiatives: Create internal initiative step 1 & 2 - JIRA (atlassian.net)
[PKG-829] 17. Initiatives: Create supplier initiative step 1 & 2 - JIRA (atlassian.net)
[PKG-830] 18. Initiatives: Create internal/supplier initiative step 3 - JIRA (atlassian.net)
[PKG-831] 19. Initiatives: View initiatives in DMW - JIRA (atlassian.net)
[PKG-832] 20. Initiatives: View initiatives in UI - JIRA (atlassian.net)
[PKG-833] 21. Initiatives: View initiatives drill down DMW & UI - JIRA (atlassian.net)
```

- Answer:-

You can achieve this by using regular expressions in Java. Here's a Java program that extracts text inside `[..]` from the given lines of text:

```java
import java.util.regex.*;
import java.util.*;

public class TextInsideBrackets {
    public static void main(String[] args) {
        // The input lines of text
        String[] lines = {
            "[PKG-130] 1. Goals: DMW Goals landing - JIRA (atlassian.net)",
            "[PKG-131] 2. Goals: Create qualitative or quantitative goals & general details - JIRA (atlassian.net)",
            // Add more lines here
        };

        // Regular expression pattern to match text inside [..]
        Pattern pattern = Pattern.compile("\\[(.*?)\\]");

        // List to store the extracted text
        List<String> extractedTextList = new ArrayList<>();

        // Iterate through each line and extract text inside [..]
        for (String line : lines) {
            Matcher matcher = pattern.matcher(line);
            while (matcher.find()) {
                // Group 1 contains the text inside [..]
                String extractedText = matcher.group(1);
                extractedTextList.add(extractedText);
            }
        }

        // Print the extracted text
        for (String extractedText : extractedTextList) {
            System.out.println(extractedText);
        }
    }
}
```

This program uses a regular expression pattern `\\[(.*?)\\]` to match text inside `[..]` and extracts it using the `Matcher` class. The extracted text is then stored in a `List<String>` and printed out.


# Please write java 8 code to sum all even numbers in below given list.

```List<integers> list= Arrays.asList(1,2,3,4,5);```

Sure! Here's how you can achieve this using Java 8 streams:

```java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        
        int sumOfEvens = list.stream()
                            .filter(i -> i % 2 == 0) // Filter even numbers
                            .mapToInt(Integer::intValue) // Map Integer to int
                            .sum(); // Sum all elements
        
        System.out.println("Sum of even numbers: " + sumOfEvens);
    }
}
```

This code will output:

```
Sum of even numbers: 6
```

Explanation:
- We start by creating a stream from the list using `stream()`.
- Then, we use the `filter()` method to keep only the even numbers by checking if the number modulo 2 equals 0.
- Next, we use `mapToInt()` to convert the `Integer` objects to `int` primitives.
- Finally, we call `sum()` to get the sum of all even numbers in the list.


## few Java 8 coding skill questions around lists of integers

Certainly! Here are a few Java 8 coding skill questions around lists of integers:

1. **Find the sum of all integers in a list**:
   Write a method that takes a list of integers as input and returns the sum of all the integers in the list.

2. **Find the maximum integer in a list**:
   Write a method that takes a list of integers as input and returns the maximum integer in the list.

3. **Find the minimum integer in a list**:
   Write a method that takes a list of integers as input and returns the minimum integer in the list.

4. **Find the average of all integers in a list**:
   Write a method that takes a list of integers as input and returns the average of all the integers in the list.

5. **Check if all integers in a list are even**:
   Write a method that takes a list of integers as input and returns true if all the integers in the list are even, otherwise false.

6. **Check if any integer in a list is negative**:
   Write a method that takes a list of integers as input and returns true if there is at least one negative integer in the list, otherwise false.

7. **Filter even integers from a list**:
   Write a method that takes a list of integers as input and returns a new list containing only the even integers from the original list.

8. **Double all integers in a list**:
   Write a method that takes a list of integers as input and returns a new list where each integer is doubled.

9. **Find the count of integers divisible by 3 in a list**:
   Write a method that takes a list of integers as input and returns the count of integers that are divisible by 3.

10. **Find the sum of squares of all integers in a list**:
    Write a method that takes a list of integers as input and returns the sum of the squares of all the integers in the list.

These questions cover a range of Java 8 stream operations and functional programming concepts applied to lists of integers. They can be used to assess candidates' understanding of Java 8 features and their ability to write concise and efficient code.

### few Java 8 coding skill questions around lists of integers with examples

Sure! Here are a few more Java 8 coding skill questions along with their solutions:

1. **Question:** Write a Java 8 program to find the sum of all elements in a list of integers.

```java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        int sum = numbers.stream()
                         .mapToInt(Integer::intValue)
                         .sum();
        
        System.out.println("Sum of all elements: " + sum);
    }
}
```

2. **Question:** Write a Java 8 program to find the maximum element in a list of integers.

```java
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        Optional<Integer> max = numbers.stream()
                                       .max(Integer::compareTo);
        
        if (max.isPresent()) {
            System.out.println("Maximum element: " + max.get());
        } else {
            System.out.println("List is empty.");
        }
    }
}
```

3. **Question:** Write a Java 8 program to find the average of all elements in a list of integers.

```java
import java.util.Arrays;
import java.util.List;
import java.util.OptionalDouble;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        OptionalDouble average = numbers.stream()
                                       .mapToDouble(Integer::doubleValue)
                                       .average();
        
        if (average.isPresent()) {
            System.out.println("Average: " + average.getAsDouble());
        } else {
            System.out.println("List is empty.");
        }
    }
}
```

Feel free to try out these questions and solutions, and let me know if you need further explanations!

Certainly! Here are a few more Java 8 coding skill questions along with their solutions:

4. **Question:** Write a Java 8 program to find the count of even numbers in a list of integers.

```java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        long countEven = numbers.stream()
                                .filter(n -> n % 2 == 0)
                                .count();
        
        System.out.println("Count of even numbers: " + countEven);
    }
}
```

5. **Question:** Write a Java 8 program to find the product of all elements in a list of integers.

```java
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        Optional<Integer> product = numbers.stream()
                                           .reduce((a, b) -> a * b);
        
        if (product.isPresent()) {
            System.out.println("Product of all elements: " + product.get());
        } else {
            System.out.println("List is empty.");
        }
    }
}
```

6. **Question:** Write a Java 8 program to check if all elements in a list of integers are greater than 10.

```java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(15, 20, 25, 30, 35);
        
        boolean allGreaterThan10 = numbers.stream()
                                          .allMatch(n -> n > 10);
        
        if (allGreaterThan10) {
            System.out.println("All elements are greater than 10.");
        } else {
            System.out.println("Some elements are not greater than 10.");
        }
    }
}
```

Feel free to try out these questions and solutions, and let me know if you need further assistance!

## few coding skills questions around List of Strings. (only questions)
Certainly! Here are some Java coding skill questions based on lists of strings:

1. Write a Java program to find the count of strings longer than a specific length in a list of strings.
  
2. Write a Java program to sort a list of strings in alphabetical order.
  
3. Write a Java program to remove duplicate strings from a list of strings.
  
4. Write a Java program to check if a specific string is present in the list of strings.
  
5. Write a Java program to concatenate all strings in a list into a single string.

6. Write a Java program to find the count of vowels in each string of a list of strings.

7. Write a Java program to find the longest common prefix among a list of strings.

8. Write a Java program to reverse each string in a list of strings.

9. Write a Java program to find the second largest string length in a list of strings.

10. Write a Java program to find the strings with the maximum and minimum lengths in a list of strings.

Feel free to use these questions for coding interviews or practice! If you need solutions or explanations for any of these questions, just let me know.

Certainly! Here are a few more Java coding skill questions based on lists of strings:

11. Write a Java program to find the frequency of each character in a list of strings.

12. Write a Java program to find the longest palindrome substring in a list of strings.

13. Write a Java program to group strings in a list based on their lengths.

14. Write a Java program to find the strings that are anagrams of each other in a list of strings.

15. Write a Java program to find the strings that contain only unique characters in a list of strings.

16. Write a Java program to find the strings that contain a specific character at a given position in a list of strings.

17. Write a Java program to find the strings that start and end with the same character in a list of strings.

18. Write a Java program to find the strings that have a specific substring occurring more than once in a list of strings.

19. Write a Java program to find the strings that have alternating vowels and consonants in a list of strings.

20. Write a Java program to find the strings that have the same characters but in a different order in a list of strings.

These questions cover a variety of string manipulation and analysis tasks, offering a good range of challenges for coding practice. If you need further explanation or assistance with any of these questions, feel free to ask!


# please write mysql create script for below tables

Department 
id, name
Employee 
id, name, salary, joining_date, dept_id(FK)

Also generate dummy data with insert queries

**Answer:** 
Sure! Below is the MySQL create script for the two tables along with insert queries to generate dummy data:

```sql
-- Create Department table
CREATE TABLE Department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create Employee table
CREATE TABLE Employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    joining_date DATE NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(id)
);

-- Insert dummy data into Department table
INSERT INTO Department (name) VALUES
    ('Finance'),
    ('Human Resources'),
    ('Marketing');

-- Insert dummy data into Employee table
INSERT INTO Employee (name, salary, joining_date, dept_id) VALUES
    ('John Doe', 50000.00, '2023-01-15', 1),
    ('Jane Smith', 60000.00, '2022-05-20', 2),
    ('Michael Johnson', 55000.00, '2023-03-10', 3),
    ('Emily Brown', 62000.00, '2024-02-28', 1),
    ('David Wilson', 58000.00, '2022-11-05', 2);
```

This script creates two tables: `Department` and `Employee`, and populates them with dummy data. The `Employee` table has a foreign key constraint referencing the `id` column of the `Department` table.

## QUESTION:  Please write queries : 
1. To get the top 10 employee records with the maximum salary
2. To get all department names with the total number of employees in them:

**Answer:** Here are the corrected queries:

1. **To get the top 10 employee records with the maximum salary:**

```sql
SELECT id, name, salary 
FROM Employee 
ORDER BY salary DESC 
LIMIT 10;
```

Explanation:
- We select the `id`, `name`, and `salary` columns from the `Employee` table.
- We order the result by the `salary` column in descending order using `ORDER BY salary DESC`.
- Finally, we limit the result to the top 10 records using `LIMIT 10`.

2. **To get all department names with the total number of employees in them:**

```sql
SELECT d.name, COUNT(e.id) AS total_employees 
FROM Department d 
LEFT JOIN Employee e ON d.id = e.dept_id 
GROUP BY d.name;
```

Explanation:
- We select the `name` column from the `Department` table and count the number of employees in each department using `COUNT(e.id)`.
- We use a `LEFT JOIN` to ensure that we include departments even if they have no employees.
- We group the result by the department name using `GROUP BY d.name`.


### few more query questions and their answers

Certainly! Here are the SQL queries for the provided questions:

1. **Retrieve the names of all employees who joined the company in the year 2023.**

```sql
SELECT name
FROM Employee
WHERE YEAR(joining_date) = 2023;
```

2. **Find the department with the highest average salary among its employees.**

```sql
SELECT d.name AS department_name, AVG(e.salary) AS avg_salary
FROM Department d
JOIN Employee e ON d.id = e.dept_id
GROUP BY d.name
ORDER BY avg_salary DESC
LIMIT 1;
```

3. **Identify the employee(s) with the lowest salary in the Marketing department.**

```sql
SELECT name
FROM Employee
WHERE dept_id = (SELECT id FROM Department WHERE name = 'Marketing')
ORDER BY salary
LIMIT 1;
```

4. **Calculate the total salary expenditure for each department.**

```sql
SELECT d.name AS department_name, SUM(e.salary) AS total_salary_expenditure
FROM Department d
JOIN Employee e ON d.id = e.dept_id
GROUP BY d.name;
```

5. **List the names of employees who earn more than the average salary across all departments.**

```sql
SELECT name
FROM Employee
WHERE salary > (SELECT AVG(salary) FROM Employee);
```

6. **Determine the department(s) with the highest number of employees.**

```sql
SELECT d.name AS department_name, COUNT(e.id) AS num_employees
FROM Department d
LEFT JOIN Employee e ON d.id = e.dept_id
GROUP BY d.name
ORDER BY num_employees DESC
LIMIT 1;
```

7. **Find the employee(s) who joined the company most recently.**

```sql
SELECT name
FROM Employee
ORDER BY joining_date DESC
LIMIT 1;
```

8. **Retrieve the employee with the highest salary in each department.**

```sql
SELECT e.name AS employee_name, d.name AS department_name, e.salary
FROM Employee e
JOIN Department d ON e.dept_id = d.id
WHERE (e.salary, e.dept_id) IN (
    SELECT MAX(salary), dept_id
    FROM Employee
    GROUP BY dept_id
);
```

9. **Identify the department(s) where no employee has joined yet.**

```sql
SELECT name AS department_name
FROM Department
WHERE id NOT IN (SELECT DISTINCT dept_id FROM Employee);
```

10. **Calculate the average salary for employees who joined the company before the year 2023.**

```sql
SELECT AVG(salary) AS average_salary
FROM Employee
WHERE YEAR(joining_date) < 2023;
```

Feel free to try out these queries with your database and let me know if you need further assistance!

## Spring boot JPA entities and repository for both tables

Sure! Here are the Spring Boot JPA entity classes and repositories for the `Department` and `Employee` tables:

1. Department Entity:

```java
import javax.persistence.*;

@Entity
@Table(name = "Department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    // Constructors, getters, and setters
}
```

2. Employee Entity:

```java
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "Employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "salary")
    private BigDecimal salary;

    @Column(name = "joining_date")
    @Temporal(TemporalType.DATE)
    private Date joiningDate;

    @ManyToOne
    @JoinColumn(name = "dept_id")
    private Department department;

    // Constructors, getters, and setters
}
```

3. Department Repository:

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
```

4. Employee Repository:

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
```

Make sure to adjust the data types and annotations according to your specific requirements. These classes and interfaces define the entities and repositories required for interacting with the `Department` and `Employee` tables using Spring Data JPA in a Spring Boot application.


### can we have reference of all employees in Department entity?

Yes, you can have a reference to all employees within the `Department` entity. This can be achieved by using a bidirectional `@OneToMany` relationship, where each department can have multiple employees associated with it. Here's how you can modify the `Department` entity to include this reference:

```java
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "department")
    private List<Employee> employees;

    // Constructors, getters, and setters
}
```

In this modified version, the `Department` entity has a `@OneToMany` relationship with the `Employee` entity. The `mappedBy` attribute specifies that the `department` field in the `Employee` entity is the owning side of the relationship. This means that the `Department` entity does not have a foreign key column referencing the `Employee` table.

With this setup, each `Department` object can have a list of associated `Employee` objects accessible through the `employees` field. This allows you to easily navigate from a department to its employees. Make sure to update the constructors, getters, and setters accordingly.



