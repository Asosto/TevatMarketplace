// Test Supabase Connection
// Run with: node test-supabase.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...')
console.log('')

// Check environment variables
if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL not set or using placeholder')
  console.log('   Please set your Supabase URL in .env.local')
  process.exit(1)
}

if (!supabaseKey || supabaseKey === 'placeholder-key') {
  console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY not set or using placeholder')
  console.log('   Please set your Supabase key in .env.local')
  process.exit(1)
}

console.log('✅ Environment variables found')
console.log(`   URL: ${supabaseUrl}`)
console.log(`   Key: ${supabaseKey.substring(0, 20)}...`)
console.log('')

// Test connection
const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...')
    
    // Test products table
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1)
    
    if (productsError) {
      console.log('❌ Products table error:', productsError.message)
      console.log('   Make sure you ran the database schema!')
      return
    }
    
    console.log('✅ Products table accessible')
    console.log(`   Found ${products ? products.length : 0} products`)
    
    // Test orders table
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1)
    
    if (ordersError) {
      console.log('❌ Orders table error:', ordersError.message)
      console.log('   Make sure you ran the database schema!')
      return
    }
    
    console.log('✅ Orders table accessible')
    console.log(`   Found ${orders ? orders.length : 0} orders`)
    
    console.log('')
    console.log('🎉 Supabase connection successful!')
    console.log('   Your admin dashboard should work now!')
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message)
    console.log('   Check your Supabase URL and key')
  }
}

testConnection()
