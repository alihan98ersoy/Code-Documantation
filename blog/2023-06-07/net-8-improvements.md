---

title: What's new in .NET 8
author: Seyyid Yiğit
author_title: Huawei Developer
author_url: https://github.com/Andronovo-bit
author_image_url: https://github.com/andronovo-bit.png
tags: [dotnet, features, preview]
description: This blog post introduces some of the new features and improvements in .NET 8 Preview 1.
image: https://docs.microsoft.com/en-us/media/logos/logo_net.svg
hide_table_of_contents: false

---

Welcome to .NET 8! The first preview is ready for you to download and start building applications today. You can download it from https://dotnet.microsoft.com/download.

.NET 8 is a long-term support (LTS) release that will be supported for three years. It introduces several new features and enhancements to the language, libraries, runtime, and tooling. In this blog post, we will highlight some of the most exciting ones.

## C# 8

C# 8 is the latest version of the C# programming language. It introduces several new features and improvements that make the language more expressive, concise, and safe. Some of the new features are:

- **Readonly struct members**: You can now mark struct members as readonly to indicate that they don't modify the state of the struct. This can improve performance and prevent bugs.
- **Default interface methods**: You can now provide default implementations for interface methods. This enables you to add new methods to existing interfaces without breaking compatibility with existing implementations.
- **Pattern matching enhancements**: You can now use switch expressions, property patterns, tuple patterns, positional patterns, and recursive patterns to write more concise and readable code that matches on complex data structures.
- **Using declarations**: You can now use the using keyword as a declaration to simplify the disposal of resources. The scope of the using declaration ends at the end of the enclosing block.
- **Static local functions**: You can now mark local functions as static to indicate that they don't capture any variables from the enclosing scope. This can improve performance and prevent bugs.
- **Disposable ref structs**: You can now implement the IDisposable interface on ref struct types to enable using statements and declarations for them. This can simplify the cleanup of unmanaged resources.
- **Nullable reference types**: You can now use nullable annotations and warnings to express your intent for nullability and improve the safety of your code.

For more information about C# 8 features, see https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-8.

## .NET SDK changes

The .NET SDK introduces some changes that simplify the output paths and folder structure for build outputs, enable workload garbage collection, and support interpolated string handlers.

- **Simplified output paths**: You can now opt into a new output path format that gathers all build outputs into a common location. This makes it easier for tooling to anticipate and access the outputs. The common location is a folder named .artifacts in the root of your repository by default, but you can override it using properties in your Directory.build.props file.
- **Workload garbage collection**: You can now use the dotnet workload clean command to clean up workload packs that might be left over through several .NET SDK or Visual Studio updates. This can help you restore to a known state if you encounter issues when managing workloads.
- **Interpolated string handlers**: You can now use interpolated string handlers to create custom string interpolation behavior. This can improve performance and readability when working with strings that require formatting or localization.

For more information about .NET SDK changes, see https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#net-sdk-changes.

## Serialization

.NET 8 introduces some improvements to serialization that make it easier to work with JSON and XML data.

- **System.Text.Json enhancements**: You can now use System.Text.Json to serialize and deserialize records, init-only properties, non-public properties, fields, anonymous types, tuples, and collections without parameterless constructors. You can also use custom converters for enums and dictionaries, handle trailing commas and comments in JSON input, ignore null values when writing JSON output, and specify custom date formats.
- **System.Text.Json.SourceGeneration**: You can now use System.Text.Json.SourceGeneration to generate source code for serializing and deserializing types at compile time. This can improve performance and reduce memory allocations when working with JSON data.
- **System.Xml enhancements**: You can now use System.Xml to serialize and deserialize records and init-only properties. You can also use XmlSerializer to serialize and deserialize collections without parameterless constructors.

For more information about serialization improvements, see https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#serialization.

## Core .NET libraries

.NET 8 introduces some improvements to the core .NET libraries that provide functionality for common tasks, such as data access, cryptography, networking, serialization, and more.

- **System.Data enhancements**: You can now use System.Data to work with Microsoft.Data.SqlClient 4.0, which supports Azure Active Directory authentication, Always Encrypted with secure enclaves, and column encryption key caching. You can also use DbConnectionStringBuilder to parse and build connection strings with semicolons in values.
- **System.Security.Cryptography enhancements**: You can now use System.Security.Cryptography to work with AES-GCM and AES-CCM authenticated encryption algorithms, which provide confidentiality and integrity for your data. You can also use RSA to encrypt and decrypt data with OAEP (Optimal Asymmetric Encryption Padding) using SHA-2 hash algorithms.
- **System.Net enhancements**: You can now use System.Net to work with HTTP/3, the latest version of the Hypertext Transfer Protocol, which provides faster and more reliable web communication. You can also use SocketsHttpHandler to enable HTTP/3 support for HttpClient.
- **System.Text.RegularExpressions enhancements**: You can now use System.Text.RegularExpressions to work with RegexOptions.NonBacktracking, a new option that enables faster and more reliable regular expression matching. You can also use RegexGenerator to generate source code for matching regular expressions at compile time.

For more information about core .NET libraries improvements, see https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#core-net-libraries.

## Extension libraries

.NET 8 introduces some improvements to the extension libraries that provide additional functionality for specific domains, such as machine learning, diagnostics, and Windows desktop development.

- **ML.NET enhancements**: You can now use ML.NET to work with ONNX Runtime 1.9, which supports the latest ONNX models and operators. You can also use ML.NET to work with TensorFlow 2.6, which supports the latest TensorFlow models and features.
- **System.Diagnostics enhancements**: You can now use System.Diagnostics to work with EventPipe, a cross-platform mechanism for collecting diagnostic events from the runtime and the application. You can also use EventListener to listen to EventPipe events in-process.
- **Windows Desktop enhancements**: You can now use Windows Desktop to work with WebView2, a web browser control that enables you to host web content in your Windows Forms or WPF application. You can also use Windows Desktop to work with WinUI 3, a modern UI framework that enables you to build native Windows applications with rich and fluent UI.

For more information about extension libraries improvements, see https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#extension-libraries.

## Source generator for configuration binding

.NET 8 introduces a new source generator for configuration binding that enables you to bind configuration values to strongly typed classes at compile time. This can improve performance and reduce errors when working with configuration data.

To use the source generator for configuration binding, you need to add the Microsoft.Extensions.Configuration.Generator package to your project. Then you can mark your configuration classes with the [GenerateConfigurationAttribute] attribute. For example:

```cs
using Microsoft.Extensions.Configuration;

[GenerateConfigurationAttribute]
public class AppSettings
{
  public string ConnectionString { get; set; }
  public int MaxRetries { get; set; }
}
```

The source generator will generate a partial class that implements the IConfigurationBinder interface and provides a Bind method that binds configuration values to the class properties. For example:

```cs
public partial class AppSettings : IConfigurationBinder
{
  public void Bind(IConfiguration configuration)
  {
    ConnectionString = configuration["ConnectionString"];
    MaxRetries = int.Parse(configuration["MaxRetries"]);
  }
}
```

You can then use the Bind method to bind configuration values from any IConfiguration source, such as appsettings.json, environment variables, command-line arguments, or custom providers. For example:

```cs
var configuration = new ConfigurationBuilder()
  .AddJsonFile("appsettings.json")
  .AddEnvironmentVariables()
  .AddCommandLine(args)
  .Build();

var appSettings = new AppSettings();
appSettings.Bind(configuration);
```

For more information about the source generator for configuration binding, see https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#source-generator-for-configuration-binding.

## Reflection improvements

.NET 8 introduces some improvements to reflection that make it easier to work with types and members at runtime.

- **MetadataLoadContext enhancements**: You can now use MetadataLoadContext to load assemblies from byte arrays or streams. This enables you to inspect assemblies without loading them into the default load context or creating shadow copies of them.
- **AssemblyDependencyResolver enhancements**: You can now use AssemblyDependencyResolver to resolve dependencies for assemblies that are not loaded into the default load context. This enables you to load assemblies with complex dependency graphs into custom load contexts.
- **AssemblyLoadContext enhancements**: You can now use AssemblyLoadContext to unload assemblies and release their resources. This enables you to reduce memory usage and avoid memory leaks when loading and unloading assemblies dynamically.
- **Type.GetMethod enhancements**: You can now use Type.GetMethod to get methods that have generic parameters or return types. This enables you to reflect over generic methods more easily.
- **Type.MakeGenericType enhancements**: You can now use Type.MakeGenericType to create generic types with unbound type parameters. This enables you to reflect over open generic types more easily.

For more information about reflection improvements, see https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#reflection-improvements.

## Performance improvements

.NET 8 includes several improvements to code generation and just-in time (JIT) compilation that enhance performance and efficiency. Some of these improvements are:

- **Arm64 performance improvements**: .NET 8 includes various optimizations for Arm64 architecture, such as better register allocation, instruction selection, loop alignment, and hardware intrinsics support. These optimizations improve the performance of .NET applications running on Arm64 devices, such as smartphones, tablets, laptops, and servers.
- **SIMD improvements**: .NET 8 includes several improvements for SIMD (Single Instruction Multiple Data) operations, which enable better vectorization and parallelization of computations. These improvements include support for AVX-512 ISA extensions, which provide 512-bit wide vector registers and instructions; support for Generic Vector256 and Generic Vector512 types, which enable working with 256-bit and 512-bit wide vectors; and support for Generic Vector. Count property, which returns the number of elements in a vector.
- **Cloud-native improvements**: .NET 8 includes several improvements for cloud-native scenarios, such as better startup time, lower memory usage, and higher throughput. These improvements include support for profile-guided optimization (PGO), which enables the JIT compiler to use runtime profiling data to optimize code generation; support for tiered compilation, which enables the JIT compiler to generate code with different levels of optimization based on the frequency of execution; and support for ready-to-run (R2R) images, which enable pre-compiling .NET assemblies into native code images that can be loaded and executed faster.
- **JIT throughput improvements**: .NET 8 includes several improvements for JIT throughput, which is the time it takes for the JIT compiler to generate native code from IL code. These improvements include support for loop cloning, which enables duplicating loops with different conditions to optimize performance; support for loop inversion, which enables changing the order of loop iterations to optimize performance; and support for loop hoisting, which enables moving invariant expressions out of loops to optimize performance.

For more information about performance improvements in .NET 8, see https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#performance-improvements.
