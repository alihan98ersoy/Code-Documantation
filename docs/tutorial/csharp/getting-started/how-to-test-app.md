---
sidebar_position: 4
---

# How to test a .NET app

In this section, you'll learn how to test a .NET console app that prints "Hello, World!" to the console. You'll use xUnit and the .NET CLI tools to create and run unit tests, integration tests, and functional tests.

## Prerequisites

To follow this tutorial, you need to have the following installed on your computer:

- The .NET SDK
- Visual Studio Code
- The C# extension for Visual Studio Code

You also need the console app that you create in [Create a .NET console application using Visual Studio Code](https://learn.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio-code).

## Unit testing

Unit testing is the practice of testing small pieces of code, typically individual methods, independently and in isolation. Unit tests are fast, reliable, and easy to write and maintain.

To create a unit test project for your console app, open a terminal and navigate to the folder where your solution file is located. Then run the following command:

```bash
dotnet new xunit -o PrimeService.Tests
```

This command creates a new xUnit test project named PrimeService.Tests in a subfolder with the same name. The test project will contain the tests for your PrimeService class library.

To add the PrimeService class library as a dependency to the test project, run the following command:

```bash
dotnet add ./PrimeService.Tests/PrimeService.Tests.csproj reference ./PrimeService/PrimeService.csproj
```

To add the test project to the solution file, run the following command:

```bash
dotnet sln add ./PrimeService.Tests/PrimeService.Tests.csproj
```

Now you can write some unit tests for your PrimeService class. Open the PrimeService.Tests folder in Visual Studio Code and open the PrimeService_IsPrimeShould.cs file. This file contains a sample test class with one test method.

Replace the code in PrimeService_IsPrimeShould.cs with the following code:

```csharp
using System;
using Xunit;
using Prime.Services;

namespace Prime.UnitTests.Services
{
    public class PrimeService_IsPrimeShould
    {
        private readonly PrimeService _primeService;

        public PrimeService_IsPrimeShould()
        {
            _primeService = new PrimeService();
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(1)]
        public void ReturnFalseGivenValuesLessThan2(int value)
        {
            var result = _primeService.IsPrime(value);

            Assert.False(result, $"{value} should not be prime");
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(5)]
        [InlineData(7)]
        public void ReturnTrueGivenPrimesLessThan10(int value)
        {
            var result = _primeService.IsPrime(value);

            Assert.True(result, $"{value} should be prime");
        }

        [Theory]
        [InlineData(4)]
        [InlineData(6)]
        [InlineData(8)]
        [InlineData(9)]
        public void ReturnFalseGivenNonPrimesLessThan10(int value)
        {
            var result = _primeService.IsPrime(value);

            Assert.False(result, $"{value} should not be prime");
        }
    }
}
```

This code defines a test class named PrimeService_IsPrimeShould with three test methods. Each test method uses the xUnit Theory attribute to specify multiple input values for testing. The test methods use the Assert class to verify the expected results.

To run the unit tests, open a terminal and navigate to the test project folder. Then run the following command:

```bash
dotnet test
```

This command builds and runs the test project. You should see output similar to this:

```bash
Test run for C:\Users\user\unit-testing-using-dotnet-test\PrimeService.Tests\bin\Debug\net5.0\PrimeService.Tests.dll (.NETCoreApp,Version=v5.0)
Microsoft (R) Test Execution Command Line Tool Version 16.9.1
Copyright (c) Microsoft Corporation.  All rights reserved.

Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     4, Skipped:     0, Total:     4, Duration: < 1 ms - PrimeService.Tests.dll (net5.0)
```

## Integration testing

Integration testing is the practice of testing how different parts of your application work together, such as testing how your code interacts with a database, a file system, or an API. Integration tests are slower and more complex than unit tests, because they often depend on external dependencies and infrastructure.

To create an integration test project for your console app, open a terminal and navigate to the folder where your solution file is located. Then run the following command:

```bash
dotnet new xunit -o PrimeService.IntegrationTests
```

This command creates a new xUnit test project named PrimeService.IntegrationTests in a subfolder with the same name. The test project will contain the tests for your PrimeService class library that involve external dependencies.

To add the PrimeService class library as a dependency to the test project, run the following command:

```bash
dotnet add ./PrimeService.IntegrationTests/PrimeService.IntegrationTests.csproj reference ./PrimeService/PrimeService.csproj
```

To add the test project to the solution file, run the following command:

```bash
dotnet sln add ./PrimeService.IntegrationTests/PrimeService.IntegrationTests.csproj
```

Now you can write some integration tests for your PrimeService class. Open the PrimeService.IntegrationTests folder in Visual Studio Code and open the PrimeService_IsPrimeShould.cs file. This file contains a sample test class with one test method.

Replace the code in PrimeService_IsPrimeShould.cs with the following code:

```csharp
using System;
using Xunit;
using Prime.Services;

namespace Prime.IntegrationTests.Services
{
    public class PrimeService_IsPrimeShould
    {
        private readonly PrimeService _primeService;

        public PrimeService_IsPrimeShould()
        {
            _primeService = new PrimeService();
        }

        [Fact]
        public void ReturnFalseGivenValueOf1()
        {
            var result = _primeService.IsPrime(1);

            Assert.False(result, "1 should not be prime");
        }
    }
}
```

This code defines a test class named PrimeService_IsPrimeShould with one test method. The test method uses the xUnit Fact attribute to specify a single input value for testing. The test method uses the Assert class to verify the expected result.

To run the integration tests, open a terminal and navigate to the test project folder. Then run the following command:

```bash
dotnet test
```

This command builds and runs the test project. You should see output similar to this:

```bash
Test run for C:\Users\user\unit-testing-using-dotnet-test\PrimeService.IntegrationTests\bin\Debug\net5.0\PrimeService.IntegrationTests.dll (.NETCoreApp,Version=v5.0)
Microsoft (R) Test Execution Command Line Tool Version 16.9.1
Copyright (c) Microsoft Corporation.  All rights reserved.

Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     1, Skipped:     0, Total:     1, Duration: < 1 ms - PrimeService.IntegrationTests.dll (net5.0)
```

## Functional testing

Functional testing is the practice of testing how your application behaves as a whole, such as testing how it handles user input, web requests, or UI interactions. Functional tests are usually slower and more brittle than unit and integration tests, because they depend on many factors and can be affected by changes in the application or environment.

To create a functional test project for your console app, open a terminal and navigate to the folder where your solution file is located. Then run the following command:

```bash
dotnet new xunit -o PrimeService.FunctionalTests
```

This command creates a new xUnit test project named PrimeService.FunctionalTests in a subfolder with the same name. The test project will contain the tests for your console app that involve user input and output.

To add the console app as a dependency to the test project, run the following command:

```bash
dotnet add ./PrimeService.FunctionalTests/PrimeService.FunctionalTests.csproj reference ./app/app.csproj
```

To add the test project to the solution file, run the following command:

```bash
dotnet sln add ./PrimeService.FunctionalTests/PrimeService.FunctionalTests.csproj
```

Now you can write some functional tests for your console app. Open the PrimeService.FunctionalTests folder in Visual Studio Code and open the App_Should.cs file. This file contains a sample test class with one test method.

Okay, I will continue writing the code for the functional tests. Here is the rest of the code for the App_Should.cs file:

```csharp
        private readonly StringReader _input;

        public App_Should()
        {
            _output = new StringWriter();
            _input = new StringReader("Alice");
            Console.SetOut(_output);
            Console.SetIn(_input);
        }

        [Fact]
        public void PrintHelloWorld()
        {
            Program.Main(new string[0]);

            var output = _output.ToString();
            Assert.Contains("Hello World!", output);
            Assert.Contains("What is your name?", output);
            Assert.Contains("Hello, Alice!", output);
        }

        public void Dispose()
        {
            _output.Dispose();
            _input.Dispose();
        }
    }
}
```

This code defines a test class named App_Should with one test method. The test method uses the xUnit Fact attribute to specify a single test case. The test method uses the Assert class to verify the expected output.

The test class also implements the IDisposable interface to clean up the resources used by the test. The constructor of the test class creates a StringWriter and a StringReader to capture and provide the console output and input. The Dispose method disposes of these objects.

To run the functional tests, open a terminal and navigate to the test project folder. Then run the following command:

```bash
dotnet test
```

This command builds and runs the test project. You should see output similar to this:

```bash
Test run for C:\Users\user\unit-testing-using-dotnet-test\PrimeService.FunctionalTests\bin\Debug\net5.0\PrimeService.FunctionalTests.dll (.NETCoreApp,Version=v5.0)
Microsoft (R) Test Execution Command Line Tool Version 16.9.1
Copyright (c) Microsoft Corporation.  All rights reserved.

Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     1, Skipped:     0, Total:     1, Duration: < 1 ms - PrimeService.FunctionalTests.dll (net5.0)
```


# Conclusion

In this article, you learned how to create and run different types of tests for a .NET console app using Visual Studio Code, xUnit, and the .NET CLI tools. You learned how to:

- Create a unit test project to test small pieces of code in isolation
- Create an integration test project to test how your code interacts with external dependencies and infrastructure
- Create a functional test project to test how your app behaves as a whole
- Run and debug your tests using various commands and tools

Testing is an essential part of software development that helps you ensure the quality, reliability, and maintainability of your code. By following the best practices and principles of testing, you can write code that is easy to test and maintain.
