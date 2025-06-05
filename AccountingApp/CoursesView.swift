import SwiftUI

struct Course: Identifiable {
    let id = UUID()
    var title: String
    var price: Double
}

struct CoursesView: View {
    @State private var courses = [
        Course(title: "Budgeting Basics", price: 49.99),
        Course(title: "Investing 101", price: 79.99),
        Course(title: "Tax Strategies", price: 59.99)
    ]
    @State private var cart: [Course] = []
    @State private var showingCart = false
    
    var body: some View {
        NavigationView {
            List {
                ForEach(courses) { course in
                    HStack {
                        Text(course.title)
                        Spacer()
                        Text(course.price, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
                        Button("Buy") {
                            cart.append(course)
                        }
                        .buttonStyle(.borderedProminent)
                    }
                }
            }
            .navigationTitle("Courses")
            .toolbar {
                Button(action: { showingCart = true }) {
                    Image(systemName: "cart")
                }
            }
            .sheet(isPresented: $showingCart) {
                CartView(cart: cart)
            }
        }
    }
}

struct CartView: View {
    var cart: [Course]
    
    var total: Double {
        cart.reduce(0) { $0 + $1.price }
    }
    
    var body: some View {
        NavigationView {
            List {
                ForEach(cart) { course in
                    HStack {
                        Text(course.title)
                        Spacer()
                        Text(course.price, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
                    }
                }
            }
            .navigationTitle("Cart")
            .toolbar {
                Text("Total: \(total, format: .currency(code: Locale.current.currency?.identifier ?? \"USD\"))")
                    .bold()
            }
        }
    }
}
