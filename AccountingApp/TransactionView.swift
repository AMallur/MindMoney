import SwiftUI

struct Transaction: Identifiable {
    let id = UUID()
    var title: String
    var amount: Double
    var date: Date
}

struct TransactionsView: View {
    @State private var transactions: [Transaction] = []
    @State private var showingAdd = false
    
    var body: some View {
        NavigationView {
            List {
                ForEach(transactions) { tx in
                    HStack {
                        VStack(alignment: .leading) {
                            Text(tx.title).font(.headline)
                            Text(tx.date, style: .date).font(.subheadline)
                        }
                        Spacer()
                        Text(tx.amount, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
                    }
                }
            }
            .navigationTitle("Transactions")
            .toolbar {
                Button(action: { showingAdd = true }) {
                    Image(systemName: "plus")
                }
            }
            .sheet(isPresented: $showingAdd) {
                AddTransactionView { newTransaction in
                    transactions.append(newTransaction)
                }
            }
        }
    }
}

struct AddTransactionView: View {
    @Environment(\.dismiss) var dismiss
    @State private var title = ""
    @State private var amount = ""
    @State private var date = Date()
    
    var onSave: (Transaction) -> Void
    
    var body: some View {
        NavigationView {
            Form {
                TextField("Title", text: $title)
                TextField("Amount", text: $amount)
                    .keyboardType(.decimalPad)
                DatePicker("Date", selection: $date, displayedComponents: .date)
            }
            .navigationTitle("Add Transaction")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        if let value = Double(amount) {
                            onSave(Transaction(title: title, amount: value, date: date))
                            dismiss()
                        }
                    }
                }
            }
        }
    }
}
